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
        this.router.post('/',[checkJwt,checkRole(['admin'])], roles.create);
        this.router.put('/:id',[checkJwt,checkRole(['admin'])], roles.update);
        this.router.delete('/:id',[checkJwt,checkRole(['admin'])], roles.delete);
    }

}

export default new RolesRoutes().router;

