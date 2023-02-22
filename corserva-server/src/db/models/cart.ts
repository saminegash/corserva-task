import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../../config/dbConnect';
import User from './user';

interface CartAttributes {
  id?: string;
  userId?: string | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartInput extends Optional<CartAttributes, 'id'> {}
export interface CartOutput extends Required<CartAttributes> {}

class Cart extends Model<CartAttributes, CartInput> implements CartAttributes {
  public id!: string;
  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Cart.init(
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
    }
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false
  }
);

Cart.belongsTo(User, { foreignKey: 'userId' });

export default Cart;
