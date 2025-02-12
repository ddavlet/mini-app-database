import GameScore from '../../models/GameScore';
import User from '../../models/User';
import { IGameScore } from '../../models/GameScore';

class GameScoreService {
  async createScore(scoreData: Partial<IGameScore>) {
    const score = await GameScore.create(scoreData);

    // Update user's highest score if needed
    await User.findByIdAndUpdate(
      scoreData.user_id,
      {
        $max: { highest_score: scoreData.score }
      },
      { new: true }
    );

    return score;
  }

  async getTopScores(limit: number = 10) {
    return await GameScore.find()
      .sort({ score: -1 })
      .limit(limit)
      .populate('user_id', 'username');
  }

  async getUserTopScores(userId: string, limit: number = 10) {
    return await GameScore.find({ user_id: userId })
      .sort({ score: -1 })
      .limit(limit);
  }

  async getAverageScore(userId: string) {
    const result = await GameScore.aggregate([
      { $match: { user_id: userId } },
      { $group: {
          _id: null,
          averageScore: { $avg: '$score' }
        }
      }
    ]);
    return result[0]?.averageScore || 0;
  }
}

export default new GameScoreService();
