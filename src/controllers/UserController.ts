import {Request, Response} from 'express';
import {User} from '../models';

export const createUser = async (req: Request, res: Response) => {

    try {
        const user = await User.create(req.body);
        console.log(`Solicitud de creación enviada al equipo TI para el usuario ${user.name}`);
        return res.status(201).json(user);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        return res.status(500).json({error: 'Error al crear el usuario'});
    }
};

export const getUsers = async (_req: Request, res: Response) => {
    const users = await User.findAll();
    return res.status(200).json(users);
};

export const updateUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {name, email, area, role} = req.body;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({message: 'Usuario no encontrado'});
        }

        const existingUser = await User.findOne({
            where: {email}
        });

        if (existingUser && existingUser.id.toString() !== id.toString()) {
            return res.status(409).json({message: 'El correo ya está en uso por otro usuario'});
        }

        await user.update({name, email, area, role});

        return res.json(user);
    } catch (error) {
        console.error('Error actualizando usuario:', error);
        return res.status(500).json({message: 'Error del servidor'});
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({message: 'Usuario no encontrado'});
        }

        res.json(user);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({message: 'Error al obtener el usuario'});    }
};


export const deleteUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const deleted = await User.destroy({where: {id}});
        if (!deleted) {
            return res.status(404).json({message: 'Usuario no encontrado'});
        }
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({message: 'Error al eliminar el usuario', error});
    }
};

