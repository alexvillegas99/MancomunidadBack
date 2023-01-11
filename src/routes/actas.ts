import { Router } from 'express';

import actas from '../controllers/actas';
import { checkJwt } from '../middleware/jwt';
import { checkRole } from '../middleware/role';

class Actas {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/',[checkJwt], actas.list);
        this.router.get('/reporteActas',[checkJwt], actas.listReporte);
        this.router.get('/:id',[checkJwt], actas.getOne);
        this.router.post('/',[checkJwt,checkRole(['admin','emisor'])], actas.create);
        this.router.put('/:id',[checkJwt,checkRole(['admin','emisor'])], actas.update);
        this.router.delete('/:id',[checkJwt,checkRole(['admin','emisor'])], actas.delete);
        this.router.post('/buscarActa',[checkJwt], actas.buscarActa);
        
    }

}

export default new Actas().router;

