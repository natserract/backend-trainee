import { Aggregate, Result, Ok } from "types-ddd";

import { AdminCreationAttributes } from "~/modules/admin/infra/persistence/model/admin";

export class AdminEntity extends Aggregate<AdminCreationAttributes> {
  private constructor(props: AdminCreationAttributes) {
    super(props);
  }

  static create(props: AdminCreationAttributes): Result<AdminEntity> {
    return Ok(new AdminEntity(props));
  }
}
