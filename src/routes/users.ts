import { Router } from 'express';
import {
    createUser, deleteUser, getUserById,
    getUsers, updateUser

} from '../controllers/UserController';

const router = Router();

router.post('/', createUser);

router.get('/', getUsers);
router.get('/:id', getUserById);


router.put('/:id', updateUser);

router.delete('/:id', deleteUser);


export default router;
