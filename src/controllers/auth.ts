import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import * as bcryptjs from "bcryptjs";
import pool from "../database";

class Auth {
  public async login(req: Request, res: Response): Promise<void> {
    let { usuario, clave } = req.body;
    if (!(usuario && clave)) {
      res.status(400).json({ message: "Usuario & contraseña son requeridas!" });
    }
    const result = await pool.query(
      `SELECT  u.id as id,u.user ,u.pass , r.rol as rol from usuario as u,rol as r where r.id = u.id_rol and user = ? `,
      [usuario]
    );
    if (result.length === 0) {
      res.status(400).json({ message: "Usuario o contraseña incorrecto!" });
    } else {
      if (!bcryptjs.compareSync(clave, result[0].pass)) {
        res.status(400).json({ message: "Usuario o contraseña incorrecto!" });
      } else {
        const token = jwt.sign(
          { userId: result[0].id, username: result[0].user },
          config.jwtSecret
        );
        res.json({
          message: "OK",
          token,
          usuario:result[0].user,
          userId: result[0].id,
          role: result[0].rol,
        });
      }
    }
  }
  public async cambiarClave(req: Request, res: Response): Promise<void> {
    let { id, clave, nueva } = req.body;
    let user = await pool.query("SELECT * from  usuario where id = ? ", [
      id,
    ]);
    if (!bcryptjs.compareSync(clave, user[0].pass)) {
      res.status(400).json({ message: "Contraseña actual incorrecta!" });
    } else {
      const salt = bcryptjs.genSaltSync(10);
      const nuevaClave = bcryptjs.hashSync(nueva, salt);
      try {
        await pool.query(`UPDATE usuario set pass=? WHERE id = ? `, [
          nuevaClave,
          id
        ]);
        res.json({ message: "Ok" });
      } catch (error) {
        res.status(404).json({ message: "Error" });
      }
    }
  }
}

const auth = new Auth();
export default auth;
