import { Model, ModelStatic } from "sequelize";

export abstract class BaseWriteRepository<ModelT extends Model> {
  protected readonly model: ModelStatic<ModelT>;

  constructor(model: ModelStatic<ModelT>) {
    this.model = model;
  }
}
