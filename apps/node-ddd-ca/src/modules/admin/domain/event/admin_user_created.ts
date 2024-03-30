import { EventHandler } from "types-ddd";

import { AdminEntity } from "~/modules/admin/domain/entity/admin";

export class AdminUserCreated extends EventHandler<AdminEntity> {
  static readonly NAME = "admin_user_created";
  $names = AdminUserCreated.NAME;
  $version = 0;

  constructor() {
    super({
      eventName: AdminUserCreated.NAME,
    });
  }

  async dispatch(model: AdminEntity) {
    console.log("Admin User Created", model);
  }
}
