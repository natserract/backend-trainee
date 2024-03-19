import { QueryTypes } from "sequelize";

import { connection } from "~/shared/infra/db/config/config";
import { BaseReadRepository } from "~/shared/infra/persistence/repository/read";
import { UserModel, User } from "~/modules/user/infra/persistence/model/user";

const sequelize = connection.sequelize;

export interface IUserGetAllRepository {
  getAll(): Promise<UserModel[]>;
}

export interface IUserGetByIdRepository {
  getByUserId(userId: number): Promise<UserModel>;
}

export class UserReadRepository
  extends BaseReadRepository<UserModel>
  implements IUserGetAllRepository, IUserGetByIdRepository
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
