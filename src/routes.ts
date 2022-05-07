import express from "express";

import AuthController from "./controllers/AuthController";
import RecoveryController from "./controllers/RecoveryController";
import ServicesController from "./controllers/ServicesController";
import ScheduleController from "./controllers/ScheduleController";
import UserController from "./controllers/UserController";
import AuthMiddleware from "./middlewares/AuthMiddleware";

const authController = new AuthController();
const recoveryController = new RecoveryController();
const servicesController = new ServicesController();
const scheduleController = new ScheduleController();
const userController = new UserController();

const routes = express.Router();

routes.get("/", (req, res) => {
  res.json({ message: "ok" });
});

routes.post("/login", authController.login);
routes.post("/signup", authController.signup);

routes.post("/validade-email", recoveryController.validadeEmail);
routes.put("/recovery-password", recoveryController.recoveryPassword);

routes.use(AuthMiddleware);
routes.get("/users", userController.index);

routes.post("/services", servicesController.store);
routes.put("/services/:id", servicesController.update);
routes.delete("/services/:id", servicesController.delete);
routes.get("/services", servicesController.index);

routes.post("/schedule", scheduleController.store);
routes.get("/schedule", scheduleController.index);
routes.get("/nextSchedule", scheduleController.getNextItemsFromToday);
routes.get("/schedule/:id", scheduleController.showSpecifScheduleItem);

routes.put("/schedule/:id", scheduleController.update);
routes.delete("/schedule/:id", scheduleController.delete);

export default routes;
