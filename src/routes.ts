import express from 'express';
import AuthController from './controllers/AuthController';

const authController = new AuthController();

const routes = express.Router();

routes.get('/', (req, res) => {
  res.json({ message: 'ok' });
});
routes.post('/login', authController.login);
routes.post('/signup', authController.signup);

export default routes;
