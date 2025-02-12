import mongoose from 'mongoose';

export interface IUser {
  first_name: string;
  username: string;
  is_premium: boolean;
  coins: number;
  highest_score: number;
  created_at: Date;
  updated_at: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    first_name: {
      type: String,
      required: [true, 'Please provide a first name'],
      maxlength: [50, 'First name cannot be more than 50 characters'],
    },
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: true,
      maxlength: [30, 'Username cannot be more than 30 characters'],
    },
    is_premium: {
      type: Boolean,
      default: false,
    },
    coins: {
      type: Number,
      default: 0,
      min: [0, 'Coins cannot be negative'],
    },
    highest_score: {
      type: Number,
      default: 0,
      min: [0, 'Score cannot be negative'],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
