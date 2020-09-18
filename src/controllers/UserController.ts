import { Request, Response } from "express";
import db from "../database/connection";

export default class UserController {
  async index(req: Request, res: Response) {
    try {
      const users = await db("users").select(
        "users.name",
        "users.email",
        "users.whatsapp"
      );

      if (users.length < 0) {
        return res.status(400).json({ error: "Error indexing users" });
      }

      return res.status(200).json({ users });
    } catch (error) {}
  }
}
