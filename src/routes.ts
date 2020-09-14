import express from 'express';
import AuthController from './controllers/AuthController';
import RecoveryController from './controllers/RecoveryController';

const authController = new AuthController();
const recoveryController = new RecoveryController();

const routes = express.Router();

// rota de teste
routes.get('/', (req, res) => {
  res.json({ message: 'ok' });
});

routes.post('/login', authController.login);
routes.post('/signup', authController.signup);

routes.post('/validade-email', recoveryController.validadeEmail);
routes.put('/recovery-password', recoveryController.recoveryPassword);

export default routes;
