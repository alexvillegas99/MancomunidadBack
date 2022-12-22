import { Router } from 'express';

import placa from '../controllers/placa';
import { checkJwt } from '../middleware/jwt';
import { checkRole } from '../middleware/role';

class User {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', placa.list);
        this.router.get('/:id',[checkJwt], placa.getOne);
        this.router.post('/',[checkJwt,checkRole(['admin'])], placa.create);
        this.router.put('/:id',[checkJwt,checkRole(['admin'])], placa.update);
        this.router.delete('/:id',[checkJwt,checkRole(['admin'])], placa.delete);
        this.router.post('/buscarPlaca',[checkJwt], placa.buscarPlaca);
    }

}

export default new User().router;

