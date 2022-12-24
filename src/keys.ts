import {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_USER,
    DB_PORT
  } from './config'
  
export default {

    database: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        port:Number(DB_PORT)
    } 

  /*   database: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mancomunidad',
    }  */
    /* Producción
    database: {
        host: 'localhost',
        user: 'transito_transito',
        password: 'uKX8idb$SOG(',
        database: 'transito_prueba',
    } */

}