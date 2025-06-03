import { Router } from 'express';
import userRoutes from './users';
import accessRequestRoutes from './accessRequests';
import computerRoutes from './computers';

const router = Router();

router.use('/users', userRoutes);
router.use('/access-requests', accessRequestRoutes);
router.use('/computers', computerRoutes);

export default router;