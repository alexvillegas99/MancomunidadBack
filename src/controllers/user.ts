import { Request, Response } from "express";
import * as bcryptjs from "bcryptjs";

import pool from "../database";

class User {
  public async list(req: Request, res: Response): Promise<void> {
    const result = await pool.query(
      `select u.id,u.user,u.pass,r.rol, u.estado from usuario as u, rol as r WHERE u.id_rol = r.id ORDER BY u.id ASC`
    );
    res.json(result);
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const result = await pool.query(
      `select u.id,u.user,r.rol,u.estado 
      from usuario as u, rol as r WHERE u.id_rol = r.id && u.id = ? `,
      [id]
    );
    if (result.length > 0) {
      return res.json(result[0]);
    }
    res.status(404).json({ text: "El registro no existe" });
  }
  public async create(req: Request, res: Response): Promise<void> { 
    const salt = bcryptjs.genSaltSync(10);
    req.body.pass = bcryptjs.hashSync(req.body.pass, salt);
    const result = await pool.query(
      `SELECT * FROM usuario where user=?`,
      req.body.user
    );
    if (result.length > 0) {
      res
        .status(404)
        .json({ message: "El usuario ya existe" });
      return;
    }
    try {
      const result = await pool.query(`INSERT INTO usuario set ? `, [
        req.body,
      ]);
      res.json({ message: "Ok" });
    } catch (error) {
      res.status(404).json({ message: "Error" });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await pool.query(`UPDATE usuario set ? WHERE id = ? `, [req.body, id]);
      res.json({ message: "Ok" });
    } catch (error) {
      res.status(404).json({ message: "Error" });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await pool.query(`DELETE FROM usuario WHERE id = ? `, [id]);
      res.json({ message: "Ok" });
    } catch (error) {
      res.status(404).json({ message: "Error" });
    }
  }
  public async buscarUsuario(req: Request, res: Response): Promise<void> {
    console.log(req.body)
    const { busqueda } = req.body;
    try {
      const result =
        await pool.query(`select u.id,u.user,r.rol, u.estado 
      from usuario as u, rol as r WHERE u.id_rol = r.id  and concat(u.user,r.rol) LIKE '%${busqueda}%'ORDER BY u.id  ASC`);
      res.json(result);
    } catch (error) {
      res.status(404).json({ message: "Error" });
    }
  }
}

const user = new User();
export default user;
