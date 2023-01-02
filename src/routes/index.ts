import {Router} from 'express'
import actas from './actas';
import auth from './auth';
import placa from './placa';
import roles from './roles';
import tipo_placa from './tipo_placa';
import tipo_vehiculo from './tipo_vehiculo';
import user from './user';

//Importando las rutas
//Declarando la constante de rutas
const routes=Router();
//Inicializando las rutas
routes.use('auth',auth);
routes.use('/usuario',user);
routes.use('/rol',roles);
routes.use('/placa',placa);
routes.use('/tipo_placa',tipo_placa);
routes.use('/tipo_vehiculo',tipo_vehiculo);
routes.use('/actas',actas);
//Exportando rutas

export default routes;