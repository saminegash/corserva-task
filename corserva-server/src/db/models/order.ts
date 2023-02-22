import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../../config/dbConnect';
import User from './user';

interface OrderAttributes {
  id?: string;
  userId?: string | null;
  status?: string | null;
  address?: string | null;
  totalPrice?: number | null;
  quantity?: number | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderInput extends Optional<OrderAttributes, 'id'> {}
export interface OrderOutput extends Required<OrderAttributes> {}

class Order
  extends Model<OrderAttributes, OrderInput>
  implements OrderAttributes
{
  public id!: string;
  public userId!: string;
  public status!: string;
  public address!: string;
  public totalPrice!: number;
  public quantity!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false
  }
);

Order.belongsTo(User, { foreignKey: 'userId' });

export default Order;
