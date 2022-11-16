import { Router } from 'express';
import passport from 'passport';
import '@server/middleware/google';

const router = Router();

// primero se le dice que vaya a la ruta para pedir la cuenta de google
// scope retornará la información del usuario, nombre, imagen, etc...
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

// cuando ya se le haya proporcionado la cuenta, redirige aquí, como una
// respuesta
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    successRedirect: '/auth/success',
  }),
);

// esta podría ser otra ruta, simplemente es para retornar cuando todo funcione
router.get('/success', (_req, res) => {
  res.status(200).json({ message: 'Usuario autenticado' });
});

export default router;
