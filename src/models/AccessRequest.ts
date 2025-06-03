import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './User';

interface AccessRequestAttributes {
    id: number;
    user_id: number;
    user_name: string;
    request_type: 'software' | 'hardware' | 'permisos';
    applications: string[];
    justification: string;
    status: string;
    created_at?: Date;
}

interface AccessRequestCreationAttributes
    extends Optional<AccessRequestAttributes, 'id' | 'status' | 'created_at'> {}

export class AccessRequest extends Model<
    AccessRequestAttributes,
    AccessRequestCreationAttributes
> implements AccessRequestAttributes {
    public id!: number;
    public user_id!: number;
    public user_name!: string;
    public request_type!: 'software' | 'hardware' | 'permisos';
    public applications!: string[];
    public justification!: string;
    public status!: string;
    public created_at?: Date;
}

AccessRequest.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' }
        },
        user_name: { type: DataTypes.STRING, allowNull: false },
        request_type: {
            type: DataTypes.ENUM('software', 'hardware', 'permisos'),
            allowNull: false
        },
        applications: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        justification: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pending' },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    },
    {
        sequelize,
        tableName: 'access_requests',
        timestamps: false
    }
);

AccessRequest.belongsTo(User, { foreignKey: 'user_id' });
