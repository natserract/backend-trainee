import { injectable, inject } from "tsyringe";

import { UserModel } from "~/modules/user/infra/persistence/model/user";
import { UserReadRepository } from "~/modules/user/infra/persistence/repository/read";
import type { IUserGetByIdRepository } from "~/modules/user/domain/interface/repository";

@injectable()
export class UserGetUseCase {
  constructor(
    @inject(UserReadRepository) private repository: IUserGetByIdRepository,
  ) {}

  async execute(id: number): Promise<UserModel> {
    const users = await this.repository.findByUserId(id);
    return users;
  }
}
