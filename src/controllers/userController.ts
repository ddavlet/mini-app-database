import { Request, Response } from 'express';
import UserService from '../services/userService';

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const user = await UserService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getUserScores(req: Request, res: Response) {
    try {
      const scores = await UserService.getUserScores(req.params.id);
      return res.status(200).json(scores);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getUserCoins(req: Request, res: Response) {
    try {
      const coins = await UserService.getUserCoins(req.params.id);
      return res.status(200).json(coins);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getAllUsers(_req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
