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
        this.router.post('/buscarPlacaConsulta', placa.buscarPlacaConsulta);
        this.router.get('/',[checkJwt], placa.list);
        this.router.get('/:id',[checkJwt], placa.getOne);
        this.router.post('/',[checkJwt,checkRole(['admin','emisor'])], placa.create);
        this.router.put('/:id',[checkJwt,checkRole(['admin','emisor'])], placa.update);
        this.router.delete('/:id',[checkJwt,checkRole(['admin','emisor'])], placa.delete);
        this.router.post('/buscarPlaca',[checkJwt], placa.buscarPlaca);
       
    } 

}

export default new User().router;

