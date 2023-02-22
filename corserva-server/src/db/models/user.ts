import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../../config/dbConnect';
import Role from './role';

interface UserAttributes {
  id?: string;
  name?: string | null;
  email?: string | null;
  roleId?: string | null;
  password?: string | null;
  verified?: boolean | null;
  active?: boolean | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, 'id'> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: string;
  public name!: string;
  public email!: string;
  public roleId!: string;
  public password!: string;
  public verified!: boolean;
  public active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false
  }
);
User.belongsTo(Role, { foreignKey: 'roleId' });

export default User;
