import { Request, Response } from "express";
import db from "../database/connection";

import convertHourToMinutes from "../utils/convertHourTominutes";

export default class ScheduleController {
  async store(req: Request, res: Response) {
    const { from, to, day, mounth, year, user_id, service_id } = req.body;

    try {
      const hourExists = await db("schedule")
        .where({ day, mounth, year })
        .andWhere("schedule.from", ">=", convertHourToMinutes(from))
        .andWhere("schedule.to", "<=", convertHourToMinutes(to));

      if (hourExists[0]) {
        return res
          .status(400)
          .send({ message: "Schedule item already exists" });
      }

      const insertedScheduleItem = await db("schedule").insert({
        from: convertHourToMinutes(from),
        to: convertHourToMinutes(to),
        day,
        mounth,
        year,
        user_id,
        service_id,
      });

      if (!insertedScheduleItem) {
        return res
          .status(400)
          .json({ error: "Error creating a schedule item" });
      }

      return res.status(201).json({ message: "success" });
    } catch (error: any) {
      console.log(error);
      return res
        .status(400)
        .json({ error: "error on create item on schedule" });
    }
  }

  async index(req: Request, res: Response) {
    const filters = req.query;

    try {
      if (!!filters.day && !!filters.mounth && !!filters.to && !!filters.from) {
        const day = filters.day as string;
        const mounth = filters.mounth as string;
        const year = filters.year as string;
        const from = convertHourToMinutes(filters.from as string);
        const to = convertHourToMinutes(filters.to as string);

        const scheduleItems = await db("schedule")
          .where({ day, mounth, year })
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
      console.log(error);
      return res.status(400).send();
    }
  }

  async getScheduleByUser(req: Request, res: Response) {
    const filters = req.query;

    try {
      if (!!filters.day && !!filters.mounth && !!filters.to && !!filters.from) {
        const day = filters.day as string;
        const mounth = filters.mounth as string;
        const year = filters.year as string;
        const from = convertHourToMinutes(filters.from as string);
        const to = convertHourToMinutes(filters.to as string);
        const userId = filters.userId;

        const scheduleItems = await db("schedule")
          .where({ day, mounth, year, user_id: userId })
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
      console.log(error);
      return res.status(400).send();
    }
  }

  async getNextItemsFromToday(req: Request, res: Response) {
    const todayDate = new Date();

    const day = todayDate.getDate();
    const mounth = todayDate.getMonth() + 1;
    const year = todayDate.getFullYear();

    const scheduleItems = await db("schedule")
      .where("schedule.day", ">=", day)
      .where("schedule.mounth", ">=", mounth)
      .where("schedule.year", ">=", year)
      .join("users", "users.id", "=", "schedule.user_id")
      .select("schedule.*", "users.name", "users.email", "users.whatsapp")
      .join("services", "services.id", "=", "schedule.service_id")
      .select("services.*");

    return res.status(200).json({ scheduleItems });
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
