import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import "dotenv/config";

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send("Token not provided");

  const [, token] = authHeader.split(" ");

  try {
    const payload = <any>jwt.verify(token, process.env.APP_SECRET as string);

    res.locals.jwtPayload = payload;

    return next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
};
