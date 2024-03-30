import { DataTypes, Model, NonAttribute, CreationOptional } from "sequelize";

import { connection } from "~/shared/infra/db/config/config";
import { IAdminAttributes } from "~/modules/admin/domain/interface/admin";
import { UserModel } from "~/modules/user/infra/persistence/model/user";

const sequelize = connection.sequelize;

export interface AdminAttributes extends IAdminAttributes {}

export interface AdminCreationAttributes extends Omit<AdminAttributes, "id"> {}

export class AdminModel
  extends Model<AdminAttributes, AdminCreationAttributes>
  implements AdminAttributes
{
  declare id: CreationOptional<number>;
  declare userId: number;

  // Associations
  declare User?: NonAttribute<UserModel>;

  // Timestamps
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

AdminModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    paranoid: true,
    tableName: "admins",
  },
);

// Associations
AdminModel.belongsTo(UserModel, {
  targetKey: "id",
  foreignKey: "userId",
});
