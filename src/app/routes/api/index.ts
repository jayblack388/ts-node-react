import { Router } from 'express';
import dataRoutes from './data';

const router = Router();

router.use('/data', dataRoutes);

export default router;
