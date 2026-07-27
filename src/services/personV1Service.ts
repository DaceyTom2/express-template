export interface PersonV1 {
  id: number;
  name: string;
}

const people: PersonV1[] = [{ id: 1, name: 'Jane Doe' }];

export class PersonV1Service {
  getAll(): PersonV1[] {
    return people;
  }

  getById(id: number): PersonV1 | undefined {
    return people.find((person) => person.id === id);
  }

  create(name: string): PersonV1 {
    const person: PersonV1 = { id: Date.now(), name };
    people.push(person);
    return person;
  }

  update(id: number, name: string): PersonV1 | undefined {
    const index = people.findIndex((person) => person.id === id);

    if (index === -1) {
      return undefined;
    }

    const updatedPerson = { ...people[index], name };
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
