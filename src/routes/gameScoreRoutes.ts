import { Router, Request, Response, NextFunction } from 'express';
import GameScoreController from '../controllers/gameScoreController';

const router = Router();

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;
const wrapAsync = (fn: AsyncRequestHandler) => (req: Request, res: Response, next: NextFunction) => {
  fn(req, res, next).catch(next);
};

// Game score routes
router.post('/', wrapAsync(GameScoreController.createScore));
router.get('/top', wrapAsync(GameScoreController.getTopScores));
router.get('/user/:userId', wrapAsync(GameScoreController.getUserTopScores));

export default router;
