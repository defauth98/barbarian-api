import { Request, Response } from 'express';
import db from '../database/connection';

export default class ScheduleController {
  async store(req: Request, res: Response) {
    const { from, to, user_id, service_id } = req.body;

    try {
      const insertedScheduleItem = await db('schedule').insert({
        from,
        to,
        user_id,
        service_id,
      });

      if (!insertedScheduleItem) {
        return res
          .status(400)
          .json({ error: 'Error creating a schedule item' });
      }

      return res.status(200).json({ insertedScheduleItem });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const scheduleItems = await db('schedule');

      return res.status(200).json({ scheduleItems });
    } catch (error) {}
  }

  async update(req: Request, res: Response) {}

  async delete(req: Request, res: Response) {}
}