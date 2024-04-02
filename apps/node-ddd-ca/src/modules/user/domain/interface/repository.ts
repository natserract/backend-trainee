import { User } from "~/modules/user/domain/entity/user";
import { UserModel } from "~/modules/user/infra/persistence/model/user";

export interface IUserGetAllRepository {
  getAll(): Promise<UserModel[]>;
}

export interface IUserGetByIdRepository {
  getByUserUuid(userUuid: string): Promise<UserModel>;
}

export interface IUserReadRepository
  extends IUserGetAllRepository,
    IUserGetByIdRepository {}

export interface IUserCreateRepository {
  save(user: User): Promise<User>;
}

export interface IUserWriteRepository extends IUserCreateRepository {}
