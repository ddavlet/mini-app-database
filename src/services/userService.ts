import User from '../../models/User';
import GameScore from '../../models/GameScore';
import { IUser } from '../../models/User';

class UserService {
  async createUser(userData: Partial<IUser>) {
    return await User.create(userData);
  }

  async getUserById(id: string) {
    return await User.findById(id);
  }

  async updateUser(id: string, userData: Partial<IUser>) {
    return await User.findByIdAndUpdate(
      id,
      { $set: userData },
      { new: true, runValidators: true }
    );
  }

  async getUserScores(userId: string) {
    return await GameScore.find({ user_id: userId })
      .sort({ created_at: -1 })
      .limit(10);
  }

  async getUserCoins(userId: string) {
    const user = await User.findById(userId).select('coins');
    return user ? user.coins : 0;
  }

  async updateUserCoins(userId: string, amount: number) {
    return await User.findByIdAndUpdate(
      userId,
      { $inc: { coins: amount } },
      { new: true, runValidators: true }
    );
  }

  async getAllUsers() {
    return await User.find();
  }
}

export default new UserService();
