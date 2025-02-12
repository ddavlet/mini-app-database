import Coupon from '../../models/Coupon';
import User from '../../models/User';
import { ICoupon } from '../../models/Coupon';

class CouponService {
  async createCoupon(couponData: Partial<ICoupon>) {
    return await Coupon.create(couponData);
  }

  async getCouponByCode(code: string) {
    return await Coupon.findOne({ code: code.toUpperCase() });
  }

  async getUserCoupons(userId: string) {
    return await Coupon.find({ used_by: userId }).sort({ created_at: -1 });
  }

  async redeemCoupon(code: string, userId: string) {
    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      is_used: false,
      expiry_date: { $gt: new Date() }
    });

    if (!coupon) {
      throw new Error('Invalid or expired coupon');
    }

    // Start a transaction
    const session = await Coupon.startSession();
    session.startTransaction();

    try {
      // Mark coupon as used
      coupon.is_used = true;
      coupon.used_by = userId;
      await coupon.save({ session });

      // Apply coupon benefits
      switch (coupon.type) {
        case 'premium':
          await User.findByIdAndUpdate(
            userId,
            { is_premium: true },
            { session }
          );
          break;
        case 'coins':
          await User.findByIdAndUpdate(
            userId,
            { $inc: { coins: coupon.value } },
            { session }
          );
          break;
        // Add other coupon types handling here
      }

      await session.commitTransaction();
      return { success: true, message: 'Coupon redeemed successfully' };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async deleteCoupon(code: string) {
    return await Coupon.findOneAndDelete({ code: code.toUpperCase() });
  }
}

export default new CouponService();
