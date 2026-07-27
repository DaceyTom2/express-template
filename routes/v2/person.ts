import { Router, Request, Response } from 'express';

interface PersonV2 {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
}

const router = Router();
const people: PersonV2[] = [
  {
    id: 1,
    firstName: 'Jane',
    middleName: 'Marie',
    lastName: 'Doe',
  },
];

router.get('/', (_req: Request, res: Response<PersonV2>): void => {
  res.json(people[0]);
});

router.get('/:id', (req: Request<{ id: string }>, res: Response<PersonV2 | { message: string }>): void => {
  const person = people.find((entry) => entry.id === Number(req.params.id));

  if (!person) {
    res.status(404).json({ message: 'Person not found' });
    return;
  }

  res.json(person);
});

router.post('/', (req: Request<unknown, unknown, Partial<PersonV2>>, res: Response<PersonV2 | { message: string }>): void => {
  const { firstName, middleName, lastName } = req.body;

  if (!firstName || !lastName) {
    res.status(400).json({ message: 'firstName and lastName are required' });
    return;
  }

  const person: PersonV2 = {
    id: Date.now(),
    firstName,
    middleName: middleName ?? '',
    lastName,
  };

  people.push(person);
  res.status(201).json(person);
});

router.put('/:id', (req: Request<{ id: string }, unknown, Partial<PersonV2>>, res: Response<PersonV2 | { message: string }>): void => {
  const id = Number(req.params.id);
  const index = people.findIndex((entry) => entry.id === id);

  if (index === -1) {
    res.status(404).json({ message: 'Person not found' });
    return;
  }

  const updatedPerson: PersonV2 = {
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
