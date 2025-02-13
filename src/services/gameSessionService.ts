import mongoose from 'mongoose';
import GameSession, { IGameSession } from '../../models/GameSession';
import GameScore from '../../models/GameScore';

class GameSessionService {
  static async createSession(userId: string): Promise<IGameSession> {
    const session = new GameSession({
      user_id: new mongoose.Types.ObjectId(userId),
      start_time: new Date(),
      status: 'active'
    });
    return await session.save();
  }

  static async getAllSessions(): Promise<IGameSession[]> {
    return await GameSession.find().sort({ start_time: -1 });
  }

  static async endSession(sessionId: string, score: number, coinsEarned: number): Promise<IGameSession | null> {
    const session = await GameSession.findById(sessionId);

    if (!session || session.status !== 'active') {
      throw new Error('Invalid or already completed session');
    }

    const endTime = new Date();
    const duration = (endTime.getTime() - session.start_time.getTime()) / 1000; // Duration in seconds

    // Create game score record
    await new GameScore({
      user_id: session.user_id,
      score,
      duration,
      coins_earned: coinsEarned
    }).save();

    // Update and complete session
    session.end_time = endTime;
    session.duration = duration;
    session.score = score;
    session.coins_earned = coinsEarned;
    session.status = 'completed';

    return await session.save();
  }

  static async getUserSessions(userId: string): Promise<IGameSession[]> {
    return await GameSession.find({
      user_id: new mongoose.Types.ObjectId(userId)
    }).sort({ start_time: -1 });
  }

  static async getUserStats(userId: string) {
    const [totalGames, averageScore, totalCoins] = await Promise.all([
      GameSession.countDocuments({
        user_id: new mongoose.Types.ObjectId(userId),
        status: 'completed'
      }),
      GameScore.aggregate([
        { $match: { user_id: new mongoose.Types.ObjectId(userId) } },
        { $group: { _id: null, avgScore: { $avg: '$score' } } }
      ]),
      GameSession.aggregate([
        { $match: {
          user_id: new mongoose.Types.ObjectId(userId),
          status: 'completed'
        }},
        { $group: { _id: null, totalCoins: { $sum: '$coins_earned' } } }
      ])
    ]);

    return {
      totalGames,
      averageScore: averageScore[0]?.avgScore || 0,
      totalCoins: totalCoins[0]?.totalCoins || 0
    };
  }
}

export default GameSessionService;
