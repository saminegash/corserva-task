import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../../config/dbConnect';
import Order from './order';
import Item from './item';

interface OrderItemAttributes {
  orderId?: string;
  itemId?: string | null;
  totalPrice?: number | null;
  quantity?: number | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderItemInput extends Required<OrderItemAttributes> {}
export interface OrderItemOutput extends Required<OrderItemAttributes> {}

class OrderItem
  extends Model<OrderItemAttributes, OrderItemInput>
  implements OrderItemAttributes
{
  public orderId!: string;
  public itemId!: string;
  public totalPrice!: number;
  public quantity!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrderItem.init(
  {
    orderId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    itemId: {
      type: DataTypes.UUID,
      allowNull: false
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

Order.belongsToMany(Item, { through: OrderItem });
Item.belongsToMany(Order, { through: OrderItem });

export default OrderItem;
