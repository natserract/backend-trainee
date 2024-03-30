import { Aggregate, Result, Ok } from "types-ddd";

import { CustomerCreationAttributes } from "~/modules/customer/infra/persistence/model/customer";

export class CustomerEntity extends Aggregate<CustomerCreationAttributes> {
  private constructor(props: CustomerCreationAttributes) {
    super(props);
  }

  static create(props: CustomerCreationAttributes): Result<CustomerEntity> {
    return Ok(new CustomerEntity(props));
  }
}
