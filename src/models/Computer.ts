import {DataTypes, Model, Optional} from 'sequelize';
import {sequelize} from '../config/database';
import {User} from './User';
import {ComputerAssignment} from './ComputerAssignment';

interface ComputerAttributes {
    id: number;
    brand: string;
    model: string;
    serial_number: string;
    specifications?: string;
    status: string;
    assigned_user_id?: number;
    assigned_user_name?: string;
    assignment_date?: Date;
}

interface ComputerCreationAttributes extends Optional<ComputerAttributes, 'id' | 'specifications' | 'assigned_user_id' | 'assigned_user_name' | 'assignment_date'> {
}

export class Computer extends Model<ComputerAttributes, ComputerCreationAttributes> implements ComputerAttributes {
    public id!: number;
    public brand!: string;
    public model!: string;
    public serial_number!: string;
    public specifications?: string;
    public status!: string;
    public assigned_user_id?: number;
    public assigned_user_name?: string;
    public assignment_date?: Date;
}

Computer.init(
    {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        brand: {type: DataTypes.STRING, allowNull: false},
        model: {type: DataTypes.STRING, allowNull: false},
        serial_number: {type: DataTypes.STRING, allowNull: false, unique: true},
        specifications: {type: DataTypes.STRING},
        status: {type: DataTypes.STRING, allowNull: false, defaultValue: 'available'},
        assigned_user_id: {type: DataTypes.INTEGER, references: {model: 'users', key: 'id'}},
        assigned_user_name: {type: DataTypes.STRING},
        assignment_date: {type: DataTypes.DATE},
    },
    {sequelize, tableName: 'computers', timestamps: false}
);

Computer.belongsTo(User, {foreignKey: 'assigned_user_id'});
Computer.hasMany(ComputerAssignment, {foreignKey: 'computer_id'});