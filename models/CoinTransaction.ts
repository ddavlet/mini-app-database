import mongoose from 'mongoose';

export interface ICoinTransaction {
  user_id: mongoose.Types.ObjectId;
  amount: number;
  type: 'earn' | 'exchange';
  points_exchanged?: number;
  created_at: Date;
}

const CoinTransactionSchema = new mongoose.Schema<ICoinTransaction>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    type: {
      type: String,
      enum: ['earn', 'exchange'],
      required: [true, 'Transaction type is required'],
    },
    points_exchanged: {
      type: Number,
      min: [0, 'Points exchanged cannot be negative'],
      // Only required if type is 'exchange'
      validate: {
        validator: function(this: ICoinTransaction, value: number) {
          return this.type !== 'exchange' || (value !== undefined && value > 0);
        },
        message: 'Points exchanged is required for exchange transactions'
      }
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: false, // We don't need updatedAt for transactions
    },
  }
);

// Index for efficient querying of user transactions
CoinTransactionSchema.index({ user_id: 1, created_at: -1 });

export default mongoose.models.CoinTransaction || mongoose.model<ICoinTransaction>('CoinTransaction', CoinTransactionSchema);
