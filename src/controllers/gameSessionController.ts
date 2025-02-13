import { Request, Response } from 'express';
import GameSessionService from '../services/gameSessionService';

class GameSessionController {
  static async createSession(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ message: 'Missing required fields: userId' });
      }

      const session = await GameSessionService.createSession(userId);
      return res.status(201).json(session);
    } catch (error) {
      console.error('Error creating session:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getAllSessions(req: Request, res: Response) {
    void req;
    try {
      const sessions = await GameSessionService.getAllSessions();
      return res.status(200).json(sessions);
    } catch (error) {
      console.error('Error getting all sessions:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async endSession(req: Request, res: Response) {
    try {
      const { sessionId } = req.params;
      const { score, duration } = req.body;

      if (!sessionId) {
        return res.status(400).json({ message: 'Session ID is required' });
      }

      const session = await GameSessionService.endSession(sessionId, score, duration);
      return res.status(200).json(session);
    } catch (error) {
      console.error('Error ending session:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getUserSessions(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const sessions = await GameSessionService.getUserSessions(userId);
      return res.status(200).json(sessions);
    } catch (error) {
      console.error('Error getting user sessions:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getUserStats(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const stats = await GameSessionService.getUserStats(userId);
      return res.status(200).json(stats);
    } catch (error) {
      console.error('Error getting user stats:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default GameSessionController;
