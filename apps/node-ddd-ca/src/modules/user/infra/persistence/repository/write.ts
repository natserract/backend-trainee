import { singleton } from "tsyringe";

import { BaseWriteRepository } from "~/shared/infra/persistence/repository/write";
import { IUserWriteRepository } from "~/modules/user/domain/interface/repository";
import {
  UserModel,
  UserCreationAttributes,
} from "~/modules/user/infra/persistence/model/user";
import { User } from "~/modules/user/domain/entity/user";

@singleton()
export class UserWriteRepository
  extends BaseWriteRepository<UserModel, UserCreationAttributes>
  implements IUserWriteRepository
{
  constructor() {
    super(UserModel);
  }

  async create(user: User): Promise<User> {
    throw new Error("");
  }
}
