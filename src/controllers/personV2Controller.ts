import { Request, Response } from 'express';
import { PersonV2Service } from '../services/personV2Service.js';
import { createPersonV2Schema, idParamSchema } from '../shared/validation.js';

const service = new PersonV2Service();

export class PersonV2Controller {
  getAll(_req: Request, res: Response): void {
    res.json(service.getAll());
  }

  getById(req: Request<{ id: string }>, res: Response): void {
    const parsed = idParamSchema.safeParse(req.params);

    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.issues[0]?.message ?? 'Invalid id' });
      return;
    }

    const person = service.getById(Number(parsed.data.id));

    if (!person) {
      res.status(404).json({ message: 'Person not found' });
      return;
    }

    res.json(person);
  }

  create(req: Request, res: Response): void {
    const parsed = createPersonV2Schema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.issues[0]?.message ?? 'Invalid payload' });
      return;
    }

    const person = service.create(parsed.data);
    res.status(201).json(person);
  }

  update(req: Request<{ id: string }>, res: Response): void {
    const idParsed = idParamSchema.safeParse(req.params);

    if (!idParsed.success) {
      res.status(400).json({ message: idParsed.error.issues[0]?.message ?? 'Invalid id' });
      return;
    }

    const bodyParsed = createPersonV2Schema.safeParse(req.body);

    if (!bodyParsed.success) {
      res.status(400).json({ message: bodyParsed.error.issues[0]?.message ?? 'Invalid payload' });
      return;
    }

    const person = service.update(Number(idParsed.data.id), bodyParsed.data);

    if (!person) {
      res.status(404).json({ message: 'Person not found' });
      return;
    }

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
      res.status(404).json({ message: 'Person not found' });
      return;
    }

    res.status(204).send();
  }
}
