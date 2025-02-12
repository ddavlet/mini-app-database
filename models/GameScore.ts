import mongoose from 'mongoose';

export interface IGameScore {
  user_id: mongoose.Types.ObjectId;
  score: number;
  duration: number;
  coins_earned: number;
  created_at: Date;
}

const GameScoreSchema = new mongoose.Schema<IGameScore>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    score: {
      type: Number,
      required: [true, 'Score is required'],
      min: [0, 'Score cannot be negative'],
    },
    duration: {
      type: Number,
      required: [true, 'Game duration is required'],
      default: 30, // Default game duration in seconds
      min: [0, 'Duration cannot be negative'],
    },
    coins_earned: {
      type: Number,
      default: 0,
      min: [0, 'Coins earned cannot be negative'],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: false, // We don't need updatedAt for game scores
    },
  }
);

// Index for efficient querying of user scores
GameScoreSchema.index({ user_id: 1, score: -1 });

export default mongoose.models.GameScore || mongoose.model<IGameScore>('GameScore', GameScoreSchema);
