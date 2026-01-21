import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const key = process.env.JWT_SECRET || "CLE_DE_SECOURS";
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new Error("No token provided");

    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, key) as any;

    const userId = decodedToken.userId;
    (req as any).auth = { userId: userId };

    next();
  } catch (error) {
    res.status(401).json({ error: "Requete non authentifiée !" });
  }
};
