import { Request, Router } from 'express';
import apiKeyMW from '@server/middleware/apiKeyHeaderValidator';
import { jwtValidator } from '@server/middleware/jwtBearerValidator';
import CashFlowRouter from './CashFlows';
import UsersRouter from './Users';

const router = Router();

router.use('/security', apiKeyMW, UsersRouter);
router.use('/cashflow', apiKeyMW, jwtValidator, CashFlowRouter);

export default router;

export interface WithUserRequest extends Request {
  user?: any;
}
