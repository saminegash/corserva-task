import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../../config/dbConnect';
import Item from './item';
import Cart from './cart';

interface CartItemAttributes {
  cartId?: string;
  itemId?: string | null;
  totalPrice?: number | null;
  quantity?: number | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartItemInput extends Required<CartItemAttributes> {}
export interface CartItemOutput extends Required<CartItemAttributes> {}

class CartItem
  extends Model<CartItemAttributes, CartItemInput>
  implements CartItemAttributes
{
  public cartId!: string;
  public itemId!: string;
  public totalPrice!: number;
  public quantity!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CartItem.init(
  {
    cartId: {
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

Cart.belongsToMany(Item, { through: CartItem });
Item.belongsToMany(Cart, { through: CartItem });

export default CartItem;
