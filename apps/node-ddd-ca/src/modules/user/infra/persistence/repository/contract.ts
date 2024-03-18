import { UserModel } from "~/modules/user/application/model/user";

export interface IUserReadRepository {
  getAll(): Promise<UserModel[]>;
  getByUserId(userId: number): Promise<UserModel>;
}

export interface IUserWriteRepository {}
