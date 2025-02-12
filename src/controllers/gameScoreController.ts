import { Request, Response } from 'express';
import GameScoreService from '../services/gameScoreService';

class GameScoreController {
  async createScore(req: Request, res: Response) {
    try {
      const score = await GameScoreService.createScore(req.body);
      return res.status(201).json(score);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getTopScores(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const scores = await GameScoreService.getTopScores(limit);
      return res.status(200).json(scores);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getUserTopScores(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const limit = parseInt(req.query.limit as string) || 10;
      const scores = await GameScoreService.getUserTopScores(userId, limit);
      return res.status(200).json(scores);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new GameScoreController();
