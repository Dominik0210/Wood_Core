import mysql from "mysql";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from './config.js';

let conexion = mysql.createConnection({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
});

conexion.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log("conexión exitosa");
    }
});

export default conexion;