import  { Router } from 'express';
import roles from '../controllers/roles';


import { checkJwt } from '../middleware/jwt';
import { checkRole } from '../middleware/role';

class RolesRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/',[checkJwt], roles.list);
        this.router.get('/:id',[checkJwt], roles.getOne);
        this.router.post('/',[checkJwt,checkRole(['admin','emisor'])], roles.create);
        this.router.put('/:id',[checkJwt,checkRole(['admin','emisor'])], roles.update);
        this.router.delete('/:id',[checkJwt,checkRole(['admin','emisor'])], roles.delete);
    }

}

export default new RolesRoutes().router;

