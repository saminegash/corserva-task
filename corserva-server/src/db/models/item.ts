import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../../config/dbConnect';

interface ItemAttributes {
  id?: string;
  name?: string | null;
  vendorName?: number | null;
  description?: string | null;
  photo?: string | null;
  price?: number | null;
  quantity?: number | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ItemInput extends Optional<ItemAttributes, 'id'> {}
export interface ItemOutput extends Required<ItemAttributes> {}

class Item extends Model<ItemAttributes, ItemInput> implements ItemAttributes {
  public id!: string;
  public name!: string;
  public vendorName!: number;
  public description!: string;
  public photo!: string;
  public price!: number;
  public quantity!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Item.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vendorName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
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
export default Item;
