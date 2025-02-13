import { Router } from 'express';
import userRoutes from './userRoutes';
import gameScoreRoutes from './gameScoreRoutes';
import couponRoutes from './couponRoutes';
import gameSessionRoutes from './gameSessionRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/scores', gameScoreRoutes);
router.use('/coupons', couponRoutes);
router.use('/sessions', gameSessionRoutes);

export default router;
