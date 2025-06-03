import { Router } from 'express';
import {
    getAvailableComputers,
    assignComputer,
    getComputerAssignments, getAllComputers
} from '../controllers/ComputerController';

const router = Router();

router.get('/available', getAvailableComputers);

router.post('/assign', assignComputer);

router.get('/assignments', getComputerAssignments);

router.get('/', getAllComputers);


export default router;
