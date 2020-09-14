import { Request, Response } from 'express';
import db from '../database/connection';

export default class ServicesController {
  async index(req: Request, res: Response) {
    try {
      const services = await db('services');

      return res.status(200).json({ services });
    } catch (error) {}
  }

  async store(req: Request, res: Response) {
    const { service, price } = req.body;

    try {
      const serviceExists = await db('services').where({ service });

      if (!serviceExists[0]) {
        await db('services').insert({ service, price });

        res.status(200).json({ message: 'Success' });
      } else {
        res.status(400).json({ message: 'This service already exists' });
      }
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  async update(req: Request, res: Response) {
    const { service, price } = req.body;
    const { id } = req.params;

    try {
      const updatedServiceId = await db('services')
        .update({ service, price })
        .where({ id });

      if (updatedServiceId) {
        const updatedService = await db('services').where({
          id: updatedServiceId,
        });

        return res.status(200).json({ service: updatedService });
      } else {
        return res.status(400).json({ error: 'Error changing the service' });
      }
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const deletedServiceId = await db('services').where({ id }).del();

      if (deletedServiceId) {
        return res.status(200).json({ message: 'success' });
      }

      return res.status(400).json({ error: 'Error deleting the service' });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}
