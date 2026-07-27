import { Router, Request, Response } from 'express';

interface PersonV1 {
  id: number;
  name: string;
}

const router = Router();
const people: PersonV1[] = [{ id: 1, name: 'Jane Doe' }];

router.get('/', (_req: Request, res: Response<PersonV1>): void => {
  res.json(people[0]);
});

router.get('/:id', (req: Request<{ id: string }>, res: Response<PersonV1 | { message: string }>): void => {
  const person = people.find((entry) => entry.id === Number(req.params.id));

  if (!person) {
    res.status(404).json({ message: 'Person not found' });
    return;
  }

  res.json(person);
});

router.post('/', (req: Request<unknown, unknown, Partial<PersonV1>>, res: Response<PersonV1 | { message: string }>): void => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: 'name is required' });
    return;
  }

  const person: PersonV1 = {
    id: Date.now(),
    name,
  };

  people.push(person);
  res.status(201).json(person);
});

router.put('/:id', (req: Request<{ id: string }, unknown, Partial<PersonV1>>, res: Response<PersonV1 | { message: string }>): void => {
  const id = Number(req.params.id);
  const index = people.findIndex((entry) => entry.id === id);

  if (index === -1) {
    res.status(404).json({ message: 'Person not found' });
    return;
  }

  const updatedPerson: PersonV1 = {
    ...people[index],
    ...req.body,
    id,
  };

  people[index] = updatedPerson;
  res.json(updatedPerson);
});

router.delete('/:id', (req: Request<{ id: string }>, res: Response): void => {
  const id = Number(req.params.id);
  const index = people.findIndex((entry) => entry.id === id);

  if (index === -1) {
    res.status(404).json({ message: 'Person not found' });
    return;
  }

  people.splice(index, 1);
  res.status(204).send();
});

export default router;
