import express from 'express';

import AuthController from './controllers/AuthController';
import RecoveryController from './controllers/RecoveryController';
import ServicesController from './controllers/ServicesController';

const authController = new AuthController();
const recoveryController = new RecoveryController();
const servicesController = new ServicesController();

const routes = express.Router();

// rota de teste
routes.get('/', (req, res) => {
  res.json({ message: 'ok' });
});

// rotas de autenticação
routes.post('/login', authController.login);
routes.post('/signup', authController.signup);

// rotas de recuperação de senhas
routes.post('/validade-email', recoveryController.validadeEmail);
routes.put('/recovery-password', recoveryController.recoveryPassword);

// crud de servicos
routes.post('/services', servicesController.store);
routes.put('/services/:id', servicesController.update);
routes.delete('/services/:id', servicesController.delete);
routes.get('/services', servicesController.index);

export default routes;
