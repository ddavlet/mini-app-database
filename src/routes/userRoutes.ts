import { Router, Request, Response, NextFunction } from 'express';
import UserController from '../controllers/userController';

const router = Router();

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;
const wrapAsync = (fn: AsyncRequestHandler) => (req: Request, res: Response, next: NextFunction) => {
  fn(req, res, next).catch(next);
};

// User routes
router.post('/', wrapAsync(UserController.createUser));
router.get('/', wrapAsync(UserController.getAllUsers));
router.get('/:id', wrapAsync(UserController.getUser));
router.put('/:id', wrapAsync(UserController.updateUser));
router.get('/:id/scores', wrapAsync(UserController.getUserScores));
router.get('/:id/coins', wrapAsync(UserController.getUserCoins));

export default router;
