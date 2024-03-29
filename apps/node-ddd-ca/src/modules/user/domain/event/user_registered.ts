import { EventHandler } from "types-ddd";

import { UserEntity } from "~/modules/user/domain/entity/user";

export class UserRegistered extends EventHandler<UserEntity> {
  static readonly NAME = "user_registered";
  $names = UserRegistered.NAME;
  $version = 0;

  async dispatch(model: UserEntity) {
    console.log("User Registered", model);
  }
}
