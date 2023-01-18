import { Request, Response, NextFunction } from "express";
import pool from "../database";
export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = res.locals.jwtPayload;
    let user: any;
    let rol: string;
    try {
      let user = await pool.query(
        "SELECT  r.rol  from  usuario as u,rol as r where r.id = u.id_rol and u.id = ? ",
        [userId]
      );
      rol = user[0].rol;
    } catch (error) {
      return res.status(401).json({ message: "No autorizado" });
    }
    if (roles.includes(rol)) {
      next();
    } else {
      res.status(401).json({ message: "No autorizado" });
    }
  };
};
