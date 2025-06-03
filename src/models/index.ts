import { sequelize } from '../config/database';
import { User } from './User';
import { AccessRequest } from './AccessRequest';
import { Computer } from './Computer';
import { ComputerAssignment } from './ComputerAssignment';

User.hasMany(AccessRequest, { foreignKey: 'user_id' });
AccessRequest.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Computer, { foreignKey: 'assigned_user_id' });
Computer.belongsTo(User, { foreignKey: 'assigned_user_id' });

User.hasMany(ComputerAssignment, { foreignKey: 'user_id' });
ComputerAssignment.belongsTo(User, { foreignKey: 'user_id' });

Computer.hasMany(ComputerAssignment, { foreignKey: 'computer_id' });
ComputerAssignment.belongsTo(Computer, { foreignKey: 'computer_id' });

export {
    sequelize,
    User,
    AccessRequest,
    Computer,
    ComputerAssignment
};
