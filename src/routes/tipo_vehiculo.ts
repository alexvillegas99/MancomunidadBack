import  { Router } from 'express';
import vehiculo from '../controllers/tipo_vehiculo';


import { checkJwt } from '../middleware/jwt';
import { checkRole } from '../middleware/role';

class TipoVehiculoRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', vehiculo.list);
    }

}

export default new TipoVehiculoRoutes().router;
