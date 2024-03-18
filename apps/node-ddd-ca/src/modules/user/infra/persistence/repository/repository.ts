import { QueryTypes } from "sequelize";

import { connection } from "~/shared/infra/db/config/config";
import { BaseReadRepository } from "~/shared/infra/persistence/repository/read";
import {
  IUserReadRepository,
  IUserWriteRepository,
} from "~/modules/user/infra/persistence/repository/contract";
import { UserModel, User } from "~/modules/user/application/model/user";

const sequelize = connection.sequelize;

export class UserRepository
  extends BaseReadRepository<UserModel>
  implements IUserReadRepository, IUserWriteRepository
{
  async getAll(): Promise<UserModel[]> {
    const users = await this.getAll();
    return users;
  }

  async getByUserId(userId: number): Promise<UserModel> {
    try {
      const res = await sequelize.query(
        `SELECT * FROM users as User where User.id = ${userId} LIMIT 1`,
        {
          plain: true,
          type: QueryTypes.SELECT,
          model: User,
          mapToModel: true,
        },
      );

      return res as UserModel;
    } catch (err) {
      throw err;
    }
  }
}
