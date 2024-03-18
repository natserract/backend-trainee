import { AggregateRoot } from "@node-ts/ddd";
import { AggregateRootProperties } from "@node-ts/ddd-types";

import {
  IUserAttributes,
  UserAttributesSchema,
} from "~/modules/user/domain/interface/user";
import { UserRegistered } from "~/modules/user/domain/event/user_registered";

export interface UserProperties
  extends IUserAttributes,
    AggregateRootProperties<number> {}

export class User extends AggregateRoot<number> implements UserProperties {
  credentialUuid!: string;
  email!: string;
  phone: string | null | undefined;

  static isValidProps(props: IUserAttributes): boolean {
    const result = UserAttributesSchema.safeParse(props);
    return result.success;
  }

  static create(id: number, props: IUserAttributes): User {
    const isValidRules = User.isValidProps(props);

    if (!isValidRules) {
      throw new Error("Invalid props!");
    }

    const userRegistered = new UserRegistered(id, props.email, props.phone);
    const user = new User(id);
    // event is applied to the user object
    user.when(userRegistered);

    return user;
  }

  protected whenUserRegistered(event: UserRegistered): void {
    this.email = event.email;
  }
}
