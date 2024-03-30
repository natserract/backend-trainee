import { EventHandler } from "types-ddd";

import { CustomerEntity } from "~/modules/customer/domain/entity/customer";

export class CustomerUserCreated extends EventHandler<CustomerEntity> {
  static readonly NAME = "customer_user_created";
  $names = CustomerUserCreated.NAME;
  $version = 0;

  constructor() {
    super({
      eventName: CustomerUserCreated.NAME,
    });
  }

  async dispatch(model: CustomerEntity) {
    console.log("Customer User Created", model);
  }
}
