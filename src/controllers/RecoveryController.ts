import { Request, Response } from 'express';
import db from '../database/connection';

export default class RecoveryController {
  async validadeEmail(req: Request, res: Response) {
    const { email } = req.body;

    try {
      const emailExists = await db('users').where({ email });

      if (emailExists[0]) {
        return res.status(200).json({ message: 'success' });
      }
    } catch (err) {
      return res.json({ error: err });
    }
  }

  async recoveryPassword(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const updatedUser = await db('users')
        .update({ password })
        .where({ email });

      const user = await db('users').where({ id: updatedUser });

      return res.status(400).json({ user });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}
