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
    return people;
  }

  getById(id: number): PersonV2 | undefined {
    return people.find((person) => person.id === id);
  }

  create(input: Omit<PersonV2, 'id'>): PersonV2 {
    const person: PersonV2 = {
      id: Date.now(),
      ...input,
    };

    people.push(person);
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
    return updatedPerson;
  }

  delete(id: number): boolean {
    const index = people.findIndex((person) => person.id === id);

    if (index === -1) {
      return false;
    }

    people.splice(index, 1);
    return true;
  }
}
