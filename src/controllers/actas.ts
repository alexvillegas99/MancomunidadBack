import { Request, Response } from "express";

import pool from "../database";

class Actas {
  public async list(req: Request, res: Response): Promise<void> {
    const result = await pool.query(
      `SELECT ae.id,ae.numero_placa as id_placa, ae.numero_acta,ae.cantidad,ae.detalle,ae.observacion,p.placa as numero_placa,ae.nombre,ae.cedula,ae.dia,ae.mes,ae.anio,u.nombre as user FROM actas_entrega as ae , usuario as u, placa as p WHERE u.id=ae.usuario and p.id=ae.numero_placa ORDER BY ae.id DESC
      `
    );
    res.json(result);
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT ae.id, ae.numero_acta,ae.cantidad,ae.detalle,p.placa as numero_placa,ae.observacion,ae.nombre,ae.cedula,ae.dia,ae.mes,ae.anio,u.nombre as user FROM actas_entrega as ae , usuario as u, placa as p WHERE u.id=ae.usuario and p.id=ae.numero_placa id=? ORDER BY p.id DESC`,
      [id]
    );
    if (result.length > 0) {
      return res.json(result[0]);
    }
    res.status(404).json({ text: "El registro no existe" });
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      let continuar = true;

      console.log("1")
      do {
        let consulta = await pool.query("Select * from actas_entrega where numero_acta =?",[ req.body.numero_acta]); 
        console.log(consulta);
        if (consulta.length != 0) {
          req.body.numero_acta = Number(req.body.numero_acta) + 1;
        } else {
          continuar = false;
        }
      } while (continuar);
      console.log("1")
      const result = await pool.query("INSERT INTO actas_entrega set ?", [
        req.body,
      ]);
      res.json({ message: "Ok" });
    } catch (error) {
      console.log(error)
      res.status(404).json({ message: "Error" });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await pool.query("UPDATE actas_entrega set ? WHERE id = ?", [
        req.body,
        id,
      ]);
      res.json({ message: "Ok" });
    } catch (error) {
      res.status(404).json({ message: "Error" });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await pool.query("DELETE FROM actas_entrega WHERE id = ?", [id]);
      res.json({ message: "Ok" });
    } catch (error) {
      res.status(404).json({ message: "Error" });
    }
  }
  public async buscarActa(req: Request, res: Response): Promise<void> {
    const { busqueda } = req.body;
    try {
      const result = await pool.query(
        `SELECT ae.id, ae.numero_acta,ae.cantidad,ae.detalle,ae.numero_acta,p.placa as numero_placa,ae.observacion,ae.nombre,ae.cedula,ae.dia,ae.mes,ae.anio,u.nombre as user  FROM actas_entrega as ae , usuario as u, placa as p WHERE ae.numero_placa=p.id and u.id=ae.usuario and concat(ae.numero_acta,ae.detalle,ae.numero_placa,ae.nombre,ae.cedula,p.placa) LIKE '%${busqueda}%'ORDER BY ae.id  DESC`
      );
      res.json(result);
    } catch (error) {
      res.status(404).json({ message: "Error" });
    }
  }
  public async listReporte(req: Request, res: Response): Promise<void> {
    const result = await pool.query(
      `SELECT ae.id, ae.numero_acta,ae.cantidad,ae.detalle,p.placa as numero_placa,ae.observacion,ae.nombre,ae.cedula,ae.dia,ae.mes,ae.anio,ae.usuario,tp.tipo as tipo_placa, tv.tipo as tipo_vehiculo,p.fecha_modificacion FROM actas_entrega as ae, placa as p, tipo_vehiculo as tv, tipo_placa as tp where ae.numero_placa=p.id and p.id_tipo_placa=tp.id and p.id_tipo_vehiculo=tv.id  ORDER BY ae.id DESC`
    );
    res.json(result);
  }
}

const actas = new Actas();
export default actas;
