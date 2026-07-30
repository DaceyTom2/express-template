import { Request, Response } from 'express';
import logger from '../logger/logger.js';
import { PersonV2Service } from '../services/personV2Service.js';
import { createPersonV2Schema, idParamSchema } from '../shared/validation.js';

const service = new PersonV2Service();

export class PersonV2Controller {
  getAll(_req: Request, res: Response): void {
    const people = service.getAll();
    logger.info({ count: people.length }, 'v2 persons fetched');
    res.json(people);
  }

  getById(req: Request<{ id: string }>, res: Response): void {
    const parsed = idParamSchema.safeParse(req.params);

    if (!parsed.success) {
      logger.warn(
        { params: req.params, error: parsed.error.issues[0]?.message },
        'invalid v2 person id',
      );
      res.status(400).json({ message: parsed.error.issues[0]?.message ?? 'Invalid id' });
      return;
    }

    const person = service.getById(Number(parsed.data.id));

    if (!person) {
      logger.warn({ id: Number(parsed.data.id) }, 'v2 person not found');
      res.status(404).json({ message: 'Person not found' });
      return;
    }

    logger.info({ id: person.id }, 'v2 person fetched');
    res.json(person);
  }

  create(req: Request, res: Response): void {
    const parsed = createPersonV2Schema.safeParse(req.body);

    if (!parsed.success) {
      logger.warn(
        { body: req.body, error: parsed.error.issues[0]?.message },
        'invalid v2 person payload',
      );
      res.status(400).json({ message: parsed.error.issues[0]?.message ?? 'Invalid payload' });
      return;
    }

    const person = service.create(parsed.data);
    logger.info(
      { id: person.id, firstName: person.firstName, lastName: person.lastName },
      'v2 person created',
    );
    res.status(201).json(person);
  }

  update(req: Request<{ id: string }>, res: Response): void {
    const idParsed = idParamSchema.safeParse(req.params);

    if (!idParsed.success) {
      logger.warn(
        { params: req.params, error: idParsed.error.issues[0]?.message },
        'invalid v2 person update id',
      );
      res.status(400).json({ message: idParsed.error.issues[0]?.message ?? 'Invalid id' });
      return;
    }

    const bodyParsed = createPersonV2Schema.safeParse(req.body);

    if (!bodyParsed.success) {
      logger.warn(
        { body: req.body, error: bodyParsed.error.issues[0]?.message },
        'invalid v2 person update payload',
      );
      res.status(400).json({ message: bodyParsed.error.issues[0]?.message ?? 'Invalid payload' });
      return;
    }

    const person = service.update(Number(idParsed.data.id), bodyParsed.data);

    if (!person) {
      logger.warn({ id: Number(idParsed.data.id) }, 'v2 person update target not found');
      res.status(404).json({ message: 'Person not found' });
      return;
    }

    logger.info({ id: person.id }, 'v2 person updated');
    res.json(person);
  }

  delete(req: Request<{ id: string }>, res: Response): void {
    const parsed = idParamSchema.safeParse(req.params);

    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.issues[0]?.message ?? 'Invalid id' });
      return;
    }

    const deleted = service.delete(Number(parsed.data.id));

    if (!deleted) {
      logger.warn({ id: Number(parsed.data.id) }, 'v2 person delete target not found');
      res.status(404).json({ message: 'Person not found' });
      return;
    }

    logger.info({ id: Number(parsed.data.id) }, 'v2 person deleted');
    res.status(204).send();
  }
}
