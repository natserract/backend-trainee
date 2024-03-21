import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";

import { UserModel } from "~/modules/user/infra/persistence/model/user";
import {
  UserReadRepository,
  type IUserGetAllRepository,
} from "~/modules/user/infra/persistence/repository/read";

@provide(UserGetAllUseCase)
export class UserGetAllUseCase {
  public repository: IUserGetAllRepository;

  constructor(@inject(UserReadRepository) repository: IUserGetAllRepository) {
    this.repository = repository;
  }

  async execute(): Promise<UserModel[]> {
    const users = await this.repository.getAll();
    return users;
  }
}
