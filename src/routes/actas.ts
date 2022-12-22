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
        this.router.get('/', actas.list);
        this.router.get('/:id',[checkJwt], actas.getOne);
        this.router.post('/',[checkJwt,checkRole(['admin'])], actas.create);
        this.router.put('/:id',[checkJwt,checkRole(['admin'])], actas.update);
        this.router.delete('/:id',[checkJwt,checkRole(['admin'])], actas.delete);
        this.router.post('/buscarActa',[checkJwt], actas.buscarActa);
    }

}

export default new Actas().router;

