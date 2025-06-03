import { Router } from 'express';
import {
    createAccessRequest,
    getAllAccessRequests,
    getAccessRequestsByUser,
    updateAccessRequestStatus
} from '../controllers/AccessRequestController';

const router = Router();

router.post('/', createAccessRequest);

router.get('/', getAllAccessRequests);

router.get('/user/:userId', getAccessRequestsByUser);

router.put('/:id/status', updateAccessRequestStatus);

export default router;
