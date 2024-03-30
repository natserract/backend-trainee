import { Aggregate, Result, Ok } from "types-ddd";

import { UserAttributesSchema } from "~/modules/user/domain/interface/user";
import { UserCreationAttributes } from "~/modules/user/infra/persistence/model/user";
import { UserRegistered } from "~/modules/user/domain/event/user_registered";

export class UserEntity extends Aggregate<UserCreationAttributes> {
  private constructor(props: UserCreationAttributes) {
    super(props);
  }

  static isValidProps(props: UserCreationAttributes): boolean {
    const result = UserAttributesSchema.safeParse(props);
    return result.success;
  }

  static begin(props: UserCreationAttributes): UserEntity {
    const isValidRules = UserEntity.isValidProps(props);

    if (!isValidRules) {
      throw new Error("Invalid props!");
    }

    const userRegistered = new UserRegistered({
      eventName: UserRegistered.NAME,
    });
    const user = new UserEntity(props);

    // event is applied to the user object
    user.addEvent(userRegistered);

    return user;
  }

  static create(props: UserCreationAttributes): Result<UserEntity> {
    return Ok(new UserEntity(props));
  }
}
