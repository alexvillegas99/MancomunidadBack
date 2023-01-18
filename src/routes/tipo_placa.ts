import  { Router } from 'express';
import placa from '../controllers/tipo_placa';


import { checkJwt } from '../middleware/jwt';
import { checkRole } from '../middleware/role';

class TipoPlacaRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', placa.list);
    }

}

export default new TipoPlacaRoutes().router;
