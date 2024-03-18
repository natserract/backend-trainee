import { UserModel } from "~/modules/user/infra/persistence/model/user";
import { UserReadRepository } from "~/modules/user/infra/persistence/repository/read";

export class UserReadCoordinator {
  constructor(private readonly repository: UserReadRepository) {}

  async getAll(): Promise<UserModel[]> {
    const users = await this.repository.getAll();
    return users;
  }
}
