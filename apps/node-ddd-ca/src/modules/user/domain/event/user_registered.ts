import { Event } from "@node-ts/bus-messages";

export class UserRegistered extends Event {
  static readonly NAME = "org/account/user-registered";
  $name = UserRegistered.NAME;
  $version = 0;

  constructor(
    readonly userId: number,
    readonly email: string,
    readonly phone?: string | null,
  ) {
    super();
  }
}
