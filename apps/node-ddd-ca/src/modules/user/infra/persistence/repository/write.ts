import { singleton } from "tsyringe";
import {
  Transaction as TransactionSequelize,
  CreateOptions,
  Attributes,
} from "sequelize";

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

  async save(
    user: User,
    parentTransaction?: TransactionSequelize
  ): Promise<User> {
    return BaseWriteRepository.beginTransaction(
      { t: parentTransaction },
      async (t) => {
        return super.save(user, t);
      }
    );
  }
}
