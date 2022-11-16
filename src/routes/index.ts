import { Request, Router } from 'express';
import apiKeyMW from '@server/middleware/apiKeyHeaderValidator';
import { jwtValidator } from '@server/middleware/jwtBearerValidator';
import CashFlowRouter from './CashFlows';
import UsersRouter from './Users';
import GoogleAuthRouter from './GoogleOAuth';
import session from 'express-session';
import passport from 'passport';

const router = Router();

router.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  }),
);

router.use(passport.initialize());

router.use('/auth', GoogleAuthRouter);
router.use('/security', UsersRouter);
router.use('/cashflow', apiKeyMW, jwtValidator, CashFlowRouter);

export default router;

export interface WithUserRequest extends Request {
  user?: any;
}
