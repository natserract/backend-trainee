import { QueryTypes } from "sequelize";
import { singleton } from "tsyringe";

import { connection } from "~/shared/infra/db/config/config";
import { BaseReadRepository } from "~/shared/infra/persistence/repository/read";
import { UserModel } from "~/modules/user/infra/persistence/model/user";
import { IUserReadRepository } from "~/modules/user/domain/interface/repository";

const sequelize = connection.sequelize;

@singleton()
export class UserReadRepository
  extends BaseReadRepository<UserModel>
  implements IUserReadRepository
{
  constructor() {
    super(UserModel);
  }

  async findAll(): Promise<UserModel[]> {
    const users = this.getAll();
    return users;
  }

  async findByUserId(userId: number): Promise<UserModel> {
    try {
      const res = await sequelize.query(
        `SELECT * FROM users u where u.id = ${userId} LIMIT 1`,
        {
          plain: true,
          type: QueryTypes.SELECT,
          model: UserModel,
          mapToModel: true,
        },
      );

      return res as UserModel;
    } catch (err) {
      throw err;
    }
  }
}
