import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../../config/dbConnect';

interface RoleAttributes {
  id?: string;
  roleName?: string | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoleInput extends Optional<RoleAttributes, 'id'> {}
export interface RoleOutput extends Required<RoleAttributes> {}

class Role extends Model<RoleAttributes, RoleInput> implements RoleAttributes {
  public id?: string;
  public roleName!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Role.init(
  {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    roleName: {
      allowNull: true,
      type: DataTypes.STRING
    }
  },
  { timestamps: true, sequelize: connection, underscored: false }
);

export default Role;
