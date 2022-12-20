import { Request, Response } from "express";

import pool from "../database";

class Placas {
  public async list(req: Request, res: Response): Promise<void> {
    const result =
      await pool.query(`SELECT p.id,p.placa,tp.tipo as tipo_placa, tv.tipo as tipo_vehiculo, p.estado, u.user as usuario from placa as p, tipo_placa as tp, tipo_vehiculo as tv, usuario as u
      where p.id_tipo_placa=tp.id and p.id_tipo_vehiculo=tv.id  and  p.id_usuario_modifico=u.id  ORDER BY p.id DESC`);
    res.json(result);
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT p.id,p.placa,tp.tipo as tipo_placa, tv.tipo as tipo_vehiculo, p.estado, u.user as usuario from placa as p, tipo_placa as tp, tipo_vehiculo as tv, usuario as u,
      where p.id_tipo_placa=tp.id and p.id_tipo_vehiculo=tv.id  and p.id_usuario_modifico=u.id and p.id=? ORDER BY p.id DESC`,
      [id]
    );
    if (result.length > 0) {
      return res.json(result[0]);
    }
    res.status(404).json({ text: "El registro no existe" });
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await pool.query("INSERT INTO placa set ?", [req.body]);
      res.json({ message: "Ok" });
    } catch (error) {
      res.status(404).json({ message: "Error" });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await pool.query("UPDATE placa set ? WHERE id = ?", [req.body, id]);
      res.json({ message: "Ok" });
    } catch (error) {
      res.status(404).json({ message: "Error" });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await pool.query("DELETE FROM placa WHERE id = ?", [id]);
      res.json({ message: "Ok" });
    } catch (error) {
      res.status(404).json({ message: "Error" });
    }
  }
}

const lecturas = new Placas();
export default lecturas;
