import { Request, Response, Router } from 'express';
import { ICashFlow, CashFlow } from '@libs/CashFlow';
import { WithUserRequest } from '@routes/index';

const router = Router();
const cashFlowInstace = new CashFlow();

router.get('/', async (req: WithUserRequest, res: Response) => {
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

router.get('/summary', async (req: WithUserRequest, res: Response) => {
  try {
    res.json(await cashFlowInstace.getTypeSummary(req.user?._id));
  } catch (error) {
    res.status(503).json({ error: error });
  }
});

router.get('/count', async (req: WithUserRequest, res: Response) => {
  try {
    res.json({ count: await cashFlowInstace.getCountCashFlow(req.user?._id) });
  } catch (error) {
    res.status(503).json({ error: error });
  }
});

router.get('/byid/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    res.json(await cashFlowInstace.getCashflowById(id));
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener registro' });
  }
});

router.post('/new', async (req: WithUserRequest, res: Response) => {
  try {
    const { _id: userId } = req.user;
    const newCashflow = req.body as ICashFlow;
    const result = await cashFlowInstace.addCashFlow(newCashflow, userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.put('/update/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cashFlowForm = req.body as ICashFlow;
    await cashFlowInstace.updateCashFlow(id, cashFlowForm);
    res.status(200).json({ msg: 'Registro actualizado' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.delete('/delete/:id', (req: WithUserRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (cashFlowInstace.deleteCashFlow(id)) {
      res.status(200).json({ msg: 'Registro eliminado' });
    } else {
      res.status(200).json({ msg: 'Error al eliminar el registro' });
    }
  } catch (error) {
    res.status(200).json({ msg: 'Error al eliminar el registro' });
  }
});

export default router;
