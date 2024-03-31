import {
  Model,
  type ModelStatic,
  Transaction as TransactionSequelize,
} from "sequelize";
import { Aggregate, EntityProps } from "types-ddd";

import { connection } from "~/shared/infra/db/config/config";
import { AggregateNotFound } from "~/shared/infra/error";

const sequelize = connection.sequelize;

export abstract class BaseWriteRepository<
  WriteModelType extends Model,
  WriteAttributesType extends EntityProps,
  AggregateRootType extends
    Aggregate<WriteAttributesType> = Aggregate<WriteAttributesType>,
> {
  protected readonly model: ModelStatic<WriteModelType>;

  constructor(model: ModelStatic<WriteModelType>) {
    this.model = model;
  }

  async getById(id: AggregateRootType["id"]): Promise<WriteModelType> {
    const writeModel = await this.model.findOne({
      where: {
        // tslint:disable-next-line:no-any Can't wrangle correct type
        id: id as any,
      },
    });

    if (!writeModel) {
      throw new AggregateNotFound(this.model.name, id);
    }

    return writeModel;
  }

  async create(
    aggregateRoot: AggregateRootType,
    parentTransaction?: TransactionSequelize,
  ): Promise<WriteModelType> {
    const values = Object.assign(aggregateRoot.toObject());

    return this.model.create(values, {
      transaction: parentTransaction,
      returning: true,
    });
  }

  static async beginTransaction<T>(
    options: { t?: TransactionSequelize },
    callback: (t: TransactionSequelize) => Promise<T>,
  ) {
    let currentTransaction: TransactionSequelize | undefined = options.t;
    if (!currentTransaction) {
      currentTransaction = await sequelize.transaction();
    }

    try {
      const result: T = await callback(currentTransaction);
      // commit the transaction only when it does not have a parent transaction
      if (!options.t) {
        await currentTransaction.commit();
      }
      return result;
    } catch (err) {
      if (!options.t) {
        await currentTransaction.rollback();
      }
      throw err;
    }
  }
}
