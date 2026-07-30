import logger from '../logger/logger.js';

export interface PersonV1 {
  id: number;
  name: string;
}

const people: PersonV1[] = [{ id: 1, name: 'Jane Doe' }];

export class PersonV1Service {
  getAll(): PersonV1[] {
    logger.info({ count: people.length }, 'service fetched all v1 persons');
    return people;
  }

  getById(id: number): PersonV1 | undefined {
    const person = people.find((entry) => entry.id === id);
    logger.info({ id, found: Boolean(person) }, 'service looked up v1 person');
    return person;
  }

  create(name: string): PersonV1 {
    const person: PersonV1 = { id: Date.now(), name };
    people.push(person);
    logger.info({ id: person.id, name }, 'service created v1 person');
    return person;
  }

  update(id: number, name: string): PersonV1 | undefined {
    const index = people.findIndex((person) => person.id === id);

    if (index === -1) {
      return undefined;
    }

    const updatedPerson = { ...people[index], name };
    people[index] = updatedPerson;
    logger.info({ id, name }, 'service updated v1 person');
    return updatedPerson;
  }

  delete(id: number): boolean {
    const index = people.findIndex((person) => person.id === id);

    if (index === -1) {
      return false;
    }

    people.splice(index, 1);
    logger.info({ id }, 'service deleted v1 person');
    return true;
  }
}
