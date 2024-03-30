import { Aggregate, Result } from "types-ddd";

import { UserCreationAttributes } from "~/modules/user/infra/persistence/model/user";
import { UserAdded } from "~/modules/user/domain/event/user_added";

export class UserEntity extends Aggregate<UserCreationAttributes> {
  private constructor(props: UserCreationAttributes) {
    super(props);
  }

  static create(props: UserCreationAttributes): Result<UserEntity> {
    const userAdded = new UserAdded();
    const user = new UserEntity(props);

    // event is applied to the user object
    user.addEvent(userAdded);

    return Result.Ok(user);
  }
}
