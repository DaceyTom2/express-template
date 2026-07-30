import { describe, expect, it } from 'vitest';
import { PersonV2Service } from './personV2Service.js';

describe('PersonV2Service', () => {
  const service = new PersonV2Service();

  it('returns all people', () => {
    expect(service.getAll()).toEqual([
      {
        id: 1,
        firstName: 'Jane',
        middleName: 'Marie',
        lastName: 'Doe',
      },
    ]);
  });

  it('returns a person by id', () => {
    expect(service.getById(1)).toEqual({
      id: 1,
      firstName: 'Jane',
      middleName: 'Marie',
      lastName: 'Doe',
    });
  });

  it('creates a new person', () => {
    const person = service.create({ firstName: 'John', middleName: 'Q', lastName: 'Public' });

    expect(person).toMatchObject({ firstName: 'John', lastName: 'Public' });
    expect(person.id).toBeGreaterThan(0);
  });

  it('updates an existing person', () => {
    const person = service.update(1, { firstName: 'Jane', middleName: 'A', lastName: 'Smith' });

    expect(person).toEqual({
      id: 1,
      firstName: 'Jane',
      middleName: 'A',
      lastName: 'Smith',
    });
  });

  it('deletes an existing person', () => {
    const deleted = service.delete(1);

    expect(deleted).toBe(true);
  });
});
