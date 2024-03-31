import { User } from "~/modules/user/domain/entity/user";
import { UserModel } from "~/modules/user/infra/persistence/model/user";

export interface IUserGetAllRepository {
  getAll(): Promise<UserModel[]>;
}

export interface IUserGetByIdRepository {
  getByUserId(userId: number): Promise<UserModel>;
}

export interface IUserReadRepository
  extends IUserGetAllRepository,
    IUserGetByIdRepository {}

export interface IUserCreateRepository {
  create(user: User): Promise<UserModel>;
}

export interface IUserWriteRepository extends IUserCreateRepository {}
