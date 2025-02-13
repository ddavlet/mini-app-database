import { Router, Request, Response, NextFunction } from 'express';
import GameSessionController from '../controllers/gameSessionController';

const router = Router();

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;
const wrapAsync = (fn: AsyncRequestHandler) => (req: Request, res: Response, next: NextFunction) => {
  fn(req, res, next).catch(next);
};

// Game session routes
router.post('/', wrapAsync(GameSessionController.createSession));
router.get('/', wrapAsync(GameSessionController.getAllSessions));
router.put('/:id/end', wrapAsync(GameSessionController.endSession));
router.get('/user/:userId', wrapAsync(GameSessionController.getUserSessions));
router.get('/user/:userId/stats', wrapAsync(GameSessionController.getUserStats));

export default router;
