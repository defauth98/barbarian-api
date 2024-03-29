import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../database/connection";

import "dotenv/config";

export const saltRounds = 10;

function generateToken(id: string) {
  return jwt.sign({ id }, process.env.APP_SECRET as string, {
    expiresIn: 86400,
  });
}

export default class AuthController {
  async signup(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const userExists = await db("users").where({ email });

      if (userExists[0]) {
        return res.status(400).json({
          error: "Email já cadastrado",
        });
      }

      await bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          await db("users").insert({
            name,
            email,
            password: hash,
            whatsapp: "",
          });

          const newUser = await db("users").where({ email });

          return res.status(201).json({
            User: {
              id: newUser[0].id,
              email: newUser[0].email,
            },
            token: generateToken(newUser[0].id),
          });
        });
      });
    } catch (error) {
      console.log(error);

      return res
        .status(400)
        .json({ error: "Erro inesperado ao criar o usuário" });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await db("users").where({ email });
      if (!user[0]) {
        return res.json({ Error: "Email not exists" });
      }

      const userPassword = user[0].password;

      await bcrypt.compare(password, userPassword, function (err, result) {
        if (result) {
          const token = generateToken(user[0].id);

          return res
            .status(200)
            .json({ message: "Login success", token, user: user[0] });
        } else {
          return res.status(400).json({ error: "Wrong password" });
        }
      });
    } catch (error) {
      return res.status(400).json({ error: "Login error" });
    }
  }
}
