import { Request, Response, Router } from 'express';
import { Users } from '@server/libs/Users';

const users = new Users();
const router = Router();

router.post('/signin', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    await users.signin(name, email, password);
    res.status(200).json({ msg: 'Usuario creado correctamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear el usuario' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await users.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ msg: 'Credencialees no válidas' });
  }
});

router.post('/addrole/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const result = await users.assignRoles(id, role);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ msg: 'No se pudo asignar el rol' });
  }
});

export default router;
