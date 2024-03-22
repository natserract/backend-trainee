import { injectable, inject } from "tsyringe";

import { UserModel } from "~/modules/user/infra/persistence/model/user";
import {
  UserReadRepository,
  type IUserGetAllRepository,
} from "~/modules/user/infra/persistence/repository/read";

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
