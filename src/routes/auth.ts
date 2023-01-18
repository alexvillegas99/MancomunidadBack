import { Router } from "express";
import auth from "../controllers/auth";
import { checkJwt } from '../middleware/jwt';


class CarrerasRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.post("/", auth.login);
    this.router.post("/cambioClave",[checkJwt], auth.cambiarClave);
  }
}

export default new CarrerasRoutes().router;
