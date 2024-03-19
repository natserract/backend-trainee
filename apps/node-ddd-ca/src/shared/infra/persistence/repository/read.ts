import {
  Model,
  type ModelStatic,
  FindOptions,
  Attributes,
  IncludeOptions,
  type WhereOptions,
  OrderItem,
  Transaction as SequelizeTransaction,
} from "sequelize";
import { injectable, unmanaged } from "inversify";

import { NotFoundError } from "~/shared/common/utils/errors";

export type EagerLoad = Omit<IncludeOptions, "include"> & {
  as: string;
  model: ModelStatic<any>;
  include?: EagerLoadNested1[];
};

export type EagerLoadNested1 = Omit<IncludeOptions, "include"> & {
  as: string;
  model: ModelStatic<any>;
  include?: EagerLoadNested2[];
};
export type EagerLoadNested2 = Omit<IncludeOptions, "include"> & {
  as: string;
  model: ModelStatic<any>;
  include?: EagerLoadNested3WithException[];
};
export type EagerLoadNested3WithException = Omit<IncludeOptions, "include"> & {
  as: string;
  model: ModelStatic<any>;
  include?: EagerLoadNested3WithException[];
  exception: string;
};

export interface PaginationParams {
  limit?: number;
  offset?: number;
}

interface IBaseFields {
  createdAt: Date;
  updatedAt: Date;
}

type FindOptionsTransaction<ModelT extends Model> = Omit<
  FindOptions<Attributes<ModelT>>,
  "transaction"
> & {
  // Override transaction prop
  parentTransaction?: SequelizeTransaction;
};

type GetOptions<
  ModelT extends Model,
  K extends keyof FindOptionsTransaction<Attributes<ModelT>>,
> = Pick<FindOptionsTransaction<Attributes<ModelT>>, K>;

type GetOptionsBaseFields<
  ModelT extends Model,
  K extends keyof FindOptionsTransaction<Attributes<ModelT>>,
> = Pick<FindOptionsTransaction<Attributes<ModelT> & IBaseFields>, K>;

@injectable()
export abstract class BaseReadRepository<ModelT extends Model> {
  protected readonly model: ModelStatic<ModelT>;
  eagerLoadMapping: Map<string, EagerLoad>;
  orderSet: Set<OrderItem>;
  baseWhereClause: WhereOptions<Attributes<ModelT> & IBaseFields>;

  constructor(
    @unmanaged() model: ModelStatic<ModelT>,
    @unmanaged() eagerLoad: EagerLoad[] = [],
    @unmanaged() order: OrderItem[] = [],
    @unmanaged()
    whereClause: WhereOptions<Attributes<ModelT> & IBaseFields> = {},
  ) {
    this.model = model;
    this.eagerLoadMapping = new Map(eagerLoad.map((el) => [el.as, el]));
    this.orderSet = new Set(order);
    this.baseWhereClause = whereClause;
  }

  async get(
    id: number,
    options: GetOptions<ModelT, "parentTransaction" | "paranoid"> = {
      paranoid: true,
    },
  ): Promise<ModelT> {
    const readModel = await this.model.findByPk(id, {
      include: [...this.eagerLoadMapping.values()],
      transaction: options.parentTransaction,
      paranoid: options.paranoid,
    });

    if (!readModel) {
      throw new NotFoundError(`Could not find ${this.model.name} ${id}`);
    }

    return readModel;
  }

  async getAll(
    options: GetOptionsBaseFields<
      ModelT,
      "limit" | "offset" | "parentTransaction"
    > = {
      limit: undefined,
      offset: 0,
    },
  ): Promise<ModelT[]> {
    try {
      return await this.model.findAll({
        limit: options.limit,
        offset: options.offset,
        transaction: options.parentTransaction,
        order: this.orderSet.size
          ? [...this.orderSet]
          : [["createdAt", "DESC"]],
        include: [...this.eagerLoadMapping.values()],
      });
    } catch (err) {
      throw err;
    }
  }

  async first(
    whereClause: WhereOptions<Attributes<ModelT> & IBaseFields> = {},
    options: GetOptionsBaseFields<
      ModelT,
      "limit" | "offset" | "parentTransaction" | "paranoid"
    > = {
      paranoid: true,
    },
  ): Promise<ModelT> {
    const readModel = await this.model.findOne({
      where: {
        ...this.baseWhereClause,
        ...whereClause,
      },
      include: [...this.eagerLoadMapping.values()],
      order: [...this.orderSet],
      transaction: options.parentTransaction,
      paranoid: options.paranoid,
    });

    if (!readModel) {
      throw new NotFoundError(
        `Could not find ${this.model.name} ${JSON.stringify(whereClause)}`,
      );
    }

    return readModel;
  }

  async where(
    whereClause: WhereOptions<Attributes<ModelT> & IBaseFields> = {},
    options: GetOptionsBaseFields<
      ModelT,
      "attributes" | "limit" | "offset" | "parentTransaction"
    > = {
      limit: undefined,
      offset: 0,
    },
  ): Promise<ModelT[]> {
    try {
      return await this.model.findAll({
        attributes: options.attributes,
        where: { ...this.baseWhereClause, ...whereClause },
        limit: options.limit,
        offset: options.offset,
        order: this.orderSet.size
          ? [...this.orderSet]
          : [["createdAt", "DESC"]],
        include: [...this.eagerLoadMapping.values()],
        transaction: options.parentTransaction,
      });
    } catch (err) {
      throw err;
    }
  }

  async count(
    whereClause: WhereOptions<Attributes<ModelT> & IBaseFields> = {},
    options: GetOptionsBaseFields<ModelT, "parentTransaction">,
  ): Promise<number> {
    const countModel = await this.model.count({
      distinct: true,
      col: "id",
      where: { ...this.baseWhereClause, ...whereClause },
      transaction: options.parentTransaction,
    });

    return countModel;
  }
}
