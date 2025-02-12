import { Request, Response } from 'express';
import CouponService from '../services/couponService';

class CouponController {
  async createCoupon(req: Request, res: Response) {
    try {
      const coupon = await CouponService.createCoupon(req.body);
      return res.status(201).json(coupon);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async redeemCoupon(req: Request, res: Response) {
    try {
      const { code, userId } = req.body;
      const result = await CouponService.redeemCoupon(code, userId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getCoupon(req: Request, res: Response) {
    try {
      const coupon = await CouponService.getCouponByCode(req.params.code);
      if (!coupon) {
        return res.status(404).json({ error: 'Coupon not found' });
      }
      return res.status(200).json(coupon);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getUserCoupons(req: Request, res: Response) {
    try {
      const coupons = await CouponService.getUserCoupons(req.params.userId);
      return res.status(200).json(coupons);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new CouponController();
