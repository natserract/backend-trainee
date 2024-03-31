import { Aggregate, Result } from "types-ddd";
import { fromZodError } from "zod-validation-error";

import { UserCreationAttributes } from "~/modules/user/infra/persistence/model/user";
import { UserAdded } from "~/modules/user/domain/event/user_added";
import { CreateUserDTOSchema } from "~/modules/user/application/dto/dto";

export class User extends Aggregate<UserCreationAttributes> {
  private constructor(props: UserCreationAttributes) {
    super(props);
  }

  static create(props: UserCreationAttributes): Result<User, string> {
    const schema = CreateUserDTOSchema.safeParse(props);

    const isValidProps = schema.success;
    if (!isValidProps) {
      const validationError = fromZodError(schema.error);
      return Result.fail(validationError.toString());
    }

    const user = new User(props);
    const userAdded = new UserAdded();

    // event is applied to the user object
    user.addEvent(userAdded);

    return Result.Ok(user);
  }
}
