import { Router, Request, Response, NextFunction } from 'express';
import CouponController from '../controllers/couponController';

const router = Router();

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;
const wrapAsync = (fn: AsyncRequestHandler) => (req: Request, res: Response, next: NextFunction) => {
  fn(req, res, next).catch(next);
};

// Coupon routes
router.post('/', wrapAsync(CouponController.createCoupon));
router.post('/redeem', wrapAsync(CouponController.redeemCoupon));
router.get('/:code', wrapAsync(CouponController.getCoupon));
router.get('/user/:userId', wrapAsync(CouponController.getUserCoupons));

export default router;
