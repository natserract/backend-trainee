import { injectable, inject } from "tsyringe";

import { UserModel } from "~/modules/user/infra/persistence/model/user";
import {
  UserReadRepository,
  type IUserGetByIdRepository,
} from "~/modules/user/infra/persistence/repository/read";

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
