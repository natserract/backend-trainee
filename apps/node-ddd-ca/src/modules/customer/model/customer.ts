import {
  DataTypes,
  Model,
  Op,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
} from "sequelize";
import {
  User,
  UserModel,
  UserCreationAttributes,
} from "~/modules/user/application/model/user";
import { connection } from "~/shared/infra/db/config/config";

const sequelize = connection.sequelize;

export interface CustomerAttributes {
  id: number;
  name?: string | null;
  userId: number;
  notes?: string | null;
}

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
