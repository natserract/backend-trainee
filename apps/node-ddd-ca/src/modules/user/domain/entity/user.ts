import { Aggregate, Result, Ok } from "types-ddd";

import {
  IUserAttributes,
  UserAttributesSchema,
} from "~/modules/user/domain/interface/user";

import { UserRegistered } from "~/modules/user/domain/event/user_registered";

export interface UserProperties extends IUserAttributes {}

export class UserEntity extends Aggregate<UserProperties> {
  private constructor(props: UserProperties) {
    super(props);
  }

  static isValidProps(props: IUserAttributes): boolean {
    const result = UserAttributesSchema.safeParse(props);
    return result.success;
  }

  static begin(props: IUserAttributes): UserEntity {
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

  static create(props: IUserAttributes): Result<UserEntity> {
    return Ok(new UserEntity(props));
  }
}
