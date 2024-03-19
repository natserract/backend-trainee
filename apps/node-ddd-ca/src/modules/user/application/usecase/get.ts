import { injectable, unmanaged } from "inversify";

import { UserModel } from "~/modules/user/infra/persistence/model/user";
import type { IUserGetByIdRepository } from "~/modules/user/infra/persistence/repository/read";

@injectable()
export class UserGetUseCase {
  public repository: IUserGetByIdRepository;

  constructor(@unmanaged() repository: IUserGetByIdRepository) {
    this.repository = repository;
  }

  async execute(id: number): Promise<UserModel> {
    const users = await this.repository.getByUserId(id);
    return users;
  }
}
