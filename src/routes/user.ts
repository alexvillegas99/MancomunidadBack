import { Router } from 'express';

import user from '../controllers/user';
import { checkJwt } from '../middleware/jwt';
import { checkRole } from '../middleware/role';

class User {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/',[checkJwt], user.list);
        this.router.get('/:id',[checkJwt], user.getOne);
        this.router.post('/',[checkJwt,checkRole(['admin'])], user.create);
        this.router.put('/:id',[checkJwt,checkRole(['admin'])], user.update);
        this.router.delete('/:id',[checkJwt,checkRole(['admin'])], user.delete);
        this.router.post('/buscarUsuario',[checkJwt], user.buscarUsuario);
    }

}

export default new User().router;

