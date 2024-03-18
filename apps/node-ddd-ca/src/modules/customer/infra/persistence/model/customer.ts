import {
  DataTypes,
  Model,
  Op,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
} from "sequelize";
import { z } from "zod";

import {
  User,
  UserModel,
  UserCreationAttributes,
} from "~/modules/user/infra/persistence/model/user";
import { connection } from "~/shared/infra/db/config/config";

const sequelize = connection.sequelize;

export const CustomerAttributesSchema = z.object({
  id: z.number(),
  name: z.string().nullish(),
  userId: z.number(),
  notes: z.string().nullish(),
});

export interface CustomerAttributes
  extends z.infer<typeof CustomerAttributesSchema> {}

export interface CustomerCreationAttributes
  extends Omit<CustomerAttributes, "id"> {}

export interface CustomerModel
  extends Model<CustomerAttributes, CustomerCreationAttributes>,
    CustomerAttributes {
  // has one User
  getUser: BelongsToGetAssociationMixin<UserModel>;
  setUser: BelongsToSetAssociationMixin<UserCreationAttributes, UserModel>;
  createUser: BelongsToCreateAssociationMixin<UserModel>;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export const Customer = sequelize.define<CustomerModel>(
  "Customer",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    paranoid: true,
    tableName: "customers",
    indexes: [
      {
        unique: true,
        fields: ["userId"],
        where: {
          deletedAt: { [Op.not]: null },
        },
      },
    ],
  },
);

// Associations
Customer.belongsTo(User, {
  targetKey: "id",
  foreignKey: "userId",
});
