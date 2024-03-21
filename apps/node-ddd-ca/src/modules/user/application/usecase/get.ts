import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";

import { UserModel } from "~/modules/user/infra/persistence/model/user";
import {
  UserReadRepository,
  type IUserGetByIdRepository,
} from "~/modules/user/infra/persistence/repository/read";

@provide(UserGetUseCase)
export class UserGetUseCase {
  public repository: IUserGetByIdRepository;

  constructor(@inject(UserReadRepository) repository: IUserGetByIdRepository) {
    this.repository = repository;
  }

  async execute(id: number): Promise<UserModel> {
    const users = await this.repository.getByUserId(id);
    return users;
  }
}
