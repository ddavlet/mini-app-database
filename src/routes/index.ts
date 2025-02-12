import { Router } from 'express';
import userRoutes from './userRoutes';
import gameScoreRoutes from './gameScoreRoutes';
import couponRoutes from './couponRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/scores', gameScoreRoutes);
router.use('/coupons', couponRoutes);

export default router;
