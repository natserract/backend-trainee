import { EventHandler } from "types-ddd";

import { UserEntity } from "~/modules/user/domain/entity/user";

export class UserAdded extends EventHandler<UserEntity> {
  static readonly NAME = "user_added";
  $names = UserAdded.NAME;
  $version = 0;

  constructor() {
    super({
      eventName: UserAdded.NAME,
    });
  }

  async dispatch(model: UserEntity) {
    console.log("User Added", model);
  }
}
