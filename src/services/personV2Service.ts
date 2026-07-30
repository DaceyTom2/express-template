import logger from '../logger/logger.js';

export interface PersonV2 {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
}

const people: PersonV2[] = [
  {
    id: 1,
    firstName: 'Jane',
    middleName: 'Marie',
    lastName: 'Doe',
  },
];

export class PersonV2Service {
  getAll(): PersonV2[] {
    logger.info({ count: people.length }, 'service fetched all v2 persons');
    return people;
  }

  getById(id: number): PersonV2 | undefined {
    const person = people.find((entry) => entry.id === id);
    logger.info({ id, found: Boolean(person) }, 'service looked up v2 person');
    return person;
  }

  create(input: Omit<PersonV2, 'id'>): PersonV2 {
    const person: PersonV2 = {
      id: Date.now(),
      ...input,
    };

    people.push(person);
    logger.info(
      { id: person.id, firstName: person.firstName, lastName: person.lastName },
      'service created v2 person',
    );
    return person;
  }

  update(id: number, input: Partial<Omit<PersonV2, 'id'>>): PersonV2 | undefined {
    const index = people.findIndex((person) => person.id === id);

    if (index === -1) {
      return undefined;
    }

    const updatedPerson = {
      ...people[index],
      ...input,
    };

    people[index] = updatedPerson;
    logger.info(
      { id, firstName: updatedPerson.firstName, lastName: updatedPerson.lastName },
      'service updated v2 person',
    );
    return updatedPerson;
  }

  delete(id: number): boolean {
    const index = people.findIndex((person) => person.id === id);

    if (index === -1) {
      return false;
    }

    people.splice(index, 1);
    logger.info({ id }, 'service deleted v2 person');
    return true;
  }
}
