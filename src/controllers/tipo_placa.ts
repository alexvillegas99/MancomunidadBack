import { Request, Response } from "express";

import pool from "../database";

class TipoPlaca {
  public async list(req: Request, res: Response): Promise<void> {
    const result = await pool.query("SELECT * FROM tipo_placa");
    res.json(result);
  }

}

const tipoPlaca = new TipoPlaca();
export default tipoPlaca;
