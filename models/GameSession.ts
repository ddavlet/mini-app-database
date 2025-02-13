import mongoose from 'mongoose';

export interface IGameSession {
  user_id: mongoose.Types.ObjectId;
  start_time: Date;
  end_time?: Date;
  duration?: number;
  status: 'active' | 'completed' | 'abandoned';
  score?: number;
  coins_earned?: number;
  created_at: Date;
}

const GameSessionSchema = new mongoose.Schema<IGameSession>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    start_time: {
      type: Date,
      required: [true, 'Start time is required'],
      default: Date.now,
    },
    end_time: {
      type: Date,
    },
    duration: {
      type: Number,
      min: [0, 'Duration cannot be negative'],
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'abandoned'],
      required: [true, 'Session status is required'],
      default: 'active',
    },
    score: {
      type: Number,
      min: [0, 'Score cannot be negative'],
    },
    coins_earned: {
      type: Number,
      min: [0, 'Coins earned cannot be negative'],
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: false, // We don't need updatedAt for game sessions
    },
  }
);

// Index for efficient querying of user sessions
GameSessionSchema.index({ user_id: 1, start_time: -1 });
GameSessionSchema.index({ status: 1 }); // For querying active sessions

export default mongoose.models.GameSession || mongoose.model<IGameSession>('GameSession', GameSessionSchema);
