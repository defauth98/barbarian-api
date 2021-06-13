import { Request, Response } from "express";
import db from "../database/connection";

import convertHourToMinutes from "../utils/convertHourTominutes";

export default class ScheduleController {
  async store(req: Request, res: Response) {
    const { from, to, week_day, user_id, service_id } = req.body;

    try {
      const hourExists = await db("schedule")
        .where({ week_day })
        .andWhere("schedule.from", ">=", convertHourToMinutes(from))
        .andWhere("schedule.to", "<=", convertHourToMinutes(to));

      if (hourExists[0]) {
        return res.status(400).send({ message: "Hour already exists" });
      }

      const insertedScheduleItem = await db("schedule").insert({
        from: convertHourToMinutes(from),
        to: convertHourToMinutes(to),
        week_day,
        user_id,
        service_id,
      });

      if (!insertedScheduleItem) {
        return res
          .status(400)
          .json({ error: "Error creating a schedule item" });
      }

      return res.status(201).json({ message: "success" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async index(req: Request, res: Response) {
    const filters = req.query;

    const week_day = filters.week_day as string;
    const from = convertHourToMinutes(filters.from as string);
    const to = convertHourToMinutes(filters.to as string);

    try {
      if (!!filters.week_day && !!filters.to && !!filters.from) {
        const scheduleItems = await db("schedule")
          .where({ week_day })
          .andWhere("schedule.from", ">=", from)
          .andWhere("schedule.to", "<=", to)
          .join("users", "users.id", "=", "schedule.user_id")
          .select("schedule.*", "users.name", "users.email", "users.whatsapp")
          .join("services", "services.id", "=", "schedule.service_id")
          .select("services.*");

        return res
          .status(200)
          .json({ scheduleItems, message: "filter is active" });
      }

      const scheduleItems = await db("schedule")
        .join("users", "users.id", "=", "schedule.user_id")
        .select("schedule.*", "users.name", "users.email", "users.whatsapp")
        .join("services", "services.id", "=", "schedule.service_id")
        .select("services.*");

      return res.status(200).json({ scheduleItems });
    } catch (error) {
      return res.status(400).send();
    }
  }

  async showSpecifScheduleItem(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const scheduleItems = await db("schedule")
        .where("schedule.id", "=", id)
        .join("users", "schedule.user_id", "=", "users.id")
        .select(["schedule.*", "users.name", "users.email", "users.whatsapp"]);

      return res.status(200).json({ scheduleItems });
    } catch (error) {
      return res.status(400).send();
    }
  }

  async update(req: Request, res: Response) {
    const { from, to, week_day, user_id, service_id } = req.body;
    const { id } = req.params;

    try {
      await db("schedule")
        .update({
          from: convertHourToMinutes(from),
          to: convertHourToMinutes(to),
          week_day,
          user_id,
          service_id,
        })
        .where({ id });

      return res.status(200).send();
    } catch (error) {
      return res.status(400).send();
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await db("schedule").del().where({ id });

      return res.status(200).send();
    } catch (error) {
      return res.status(400).send();
    }
  }
}
