import express from 'express';

import AuthController from './controllers/AuthController';
import RecoveryController from './controllers/RecoveryController';
import ServicesController from './controllers/ServicesController';
import ScheduleController from './controllers/ScheduleController';
import UserController from './controllers/UserController';

const authController = new AuthController();
const recoveryController = new RecoveryController();
const servicesController = new ServicesController();
const scheduleController = new ScheduleController();
const userController = new UserController();

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

// usuários
routes.get('/users', userController.index);

// crud de servicos
routes.post('/services', servicesController.store);
routes.put('/services/:id', servicesController.update);
routes.delete('/services/:id', servicesController.delete);
routes.get('/services', servicesController.index);

// Crud de horários
routes.post('/schedule', scheduleController.store);

export default routes;
