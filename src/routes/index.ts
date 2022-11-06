import { Request, Router } from 'express';

const router = Router();

export interface withUserRequest extends Request {
  user?: any;
}

export default router;
