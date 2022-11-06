import { Response, Router } from 'express';
import { ICashFlow, CashFlow } from '@libs/CashFlow';
import { withUserRequest } from '@routes/index';

const router = Router();
const cashFlowInstace = new CashFlow();

router.get('/', async (req: withUserRequest, res: Response) => {
  try {
    const { page, items } = { page: '1', items: '10', ...req.query };
    res.json(
      await cashFlowInstace.getAllCashFlowByUserPaged(
        req.user?._id,
        Number(page),
        Number(items),
      ),
    );
  } catch (err) {
    res.status(503).json({ error: err });
  }
});
