import { injectable, unmanaged } from "inversify";

import { UserModel } from "~/modules/user/infra/persistence/model/user";
import type { IUserGetAllRepository } from "~/modules/user/infra/persistence/repository/read";

@injectable()
export class UserGetAllUseCase {
  public repository: IUserGetAllRepository;

  constructor(@unmanaged() repository: IUserGetAllRepository) {
    this.repository = repository;
  }

  async execute(): Promise<UserModel[]> {
    const users = await this.repository.getAll();
    return users;
  }
}
