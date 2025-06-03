import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ComputerAssignmentAttributes {
    id: number;
    computer_id: number;
    computer_name: string;
    serial_number: string;
    user_id: number;
    user_name: string;
    assignment_date: Date;
    return_date?: Date;
    status: string;
}

interface ComputerAssignmentCreationAttributes extends Optional<ComputerAssignmentAttributes, 'id' | 'return_date'> {}

export class ComputerAssignment extends Model<ComputerAssignmentAttributes, ComputerAssignmentCreationAttributes> implements ComputerAssignmentAttributes {
    public id!: number;
    public computer_id!: number;
    public computer_name!: string;
    public serial_number!: string;
    public user_id!: number;
    public user_name!: string;
    public assignment_date!: Date;
    public return_date?: Date;
    public status!: string;
}

ComputerAssignment.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        computer_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'computers', key: 'id' } },
        computer_name: { type: DataTypes.STRING, allowNull: false },
        serial_number: { type: DataTypes.STRING, allowNull: false },
        user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
        user_name: { type: DataTypes.STRING, allowNull: false },
        assignment_date: { type: DataTypes.DATE, allowNull: false },
        return_date: { type: DataTypes.DATE },
        status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'active' },
    },
    { sequelize, tableName: 'computer_assignments', timestamps: false }
);
