import {Request, Response} from 'express';
import {Computer, ComputerAssignment, User} from '../models';

export const getAvailableComputers = async (_req: Request, res: Response) => {
    try {
        const computers = await Computer.findAll({where: {status: 'available'}});
        res.json(computers);
    } catch (error) {
        res.status(500).json({message: 'Error fetching available computers', error});
    }
};

export const assignComputer = async (req: Request, res: Response) => {
    const {computer_id, user_id, assignment_date} = req.body;

    try {
        const computer = await Computer.findByPk(computer_id);
        const user = await User.findByPk(user_id);

        if (!computer || !user) {
            return res.status(404).json({message: 'Computer or User not found'});
        }

        if (computer.status !== 'available') {
            return res.status(400).json({message: 'Computer is not available'});
        }

        const assignment = await ComputerAssignment.create({
            computer_id,
            computer_name: `${computer.brand} ${computer.model}`,
            serial_number: computer.serial_number,
            user_id,
            user_name: user.name,
            assignment_date: new Date(),
            status: 'active',
        });

        await computer.update({
            assigned_user_id: user.id,
            assigned_user_name: user.name,
            assignment_date,
            status: 'assigned',
        });

        res.status(201).json(assignment);
    } catch (error) {
        res.status(500).json({message: 'Error assigning computer', error});
    }
};

export const getComputerAssignments = async (_req: Request, res: Response) => {
    try {
        const assignments = await ComputerAssignment.findAll({
            order: [['assignment_date', 'DESC']],
        });
        res.json(assignments);
    } catch (error) {
        res.status(500).json({message: 'Error fetching assignments', error});
    }
};

export const getAllComputers = async (_req: Request, res: Response) => {
    try {
        const computers = await Computer.findAll();
        res.json(computers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all computers', error });
    }
};
