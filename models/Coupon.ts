import mongoose from 'mongoose';

export interface ICoupon {
  code: string;
  type: 'premium' | 'coins' | 'boost';
  value: number;
  is_used: boolean;
  used_by?: mongoose.Types.ObjectId;
  expiry_date?: Date;
  created_at: Date;
  updated_at: Date;
}

const CouponSchema = new mongoose.Schema<ICoupon>(
  {
    code: {
      type: String,
      required: [true, 'Coupon code is required'],
      unique: true,
      uppercase: true,
      minlength: [6, 'Coupon code must be at least 6 characters'],
      maxlength: [20, 'Coupon code cannot exceed 20 characters'],
    },
    type: {
      type: String,
      enum: ['premium', 'coins', 'boost'],
      required: [true, 'Coupon type is required'],
    },
    value: {
      type: Number,
      required: [true, 'Coupon value is required'],
      min: [0, 'Value cannot be negative'],
    },
    is_used: {
      type: Boolean,
      default: false,
    },
    used_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    expiry_date: {
      type: Date,
      validate: {
        validator: function(value: Date) {
          return !value || value > new Date();
        },
        message: 'Expiry date must be in the future'
      }
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

// Indexes for efficient querying
CouponSchema.index({ code: 1 });
CouponSchema.index({ is_used: 1, expiry_date: 1 });
CouponSchema.index({ used_by: 1, created_at: -1 });

export default mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', CouponSchema);
