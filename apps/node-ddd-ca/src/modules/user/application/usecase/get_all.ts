import { injectable, inject } from "tsyringe";

import { UserModel } from "~/modules/user/infra/persistence/model/user";
import { UserReadRepository } from "~/modules/user/infra/persistence/repository/read";
import type { IUserGetAllRepository } from "~/modules/user/domain/interface/repository";

@injectable()
export class UserGetAllUseCase {
  constructor(
    @inject(UserReadRepository) private repository: IUserGetAllRepository,
  ) {}

  async execute(): Promise<UserModel[]> {
    const users = await this.repository.findAll();
    return users;
  }
}
