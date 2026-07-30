import { describe, expect, it } from 'vitest';
import { PersonV1Service } from './personV1Service.js';

describe('PersonV1Service', () => {
  const service = new PersonV1Service();

  it('returns all people', () => {
    expect(service.getAll()).toEqual([{ id: 1, name: 'Jane Doe' }]);
  });

  it('returns a person by id', () => {
    expect(service.getById(1)).toEqual({ id: 1, name: 'Jane Doe' });
  });

  it('creates a new person', () => {
    const person = service.create('John Doe');

    expect(person).toMatchObject({ name: 'John Doe' });
    expect(person.id).toBeGreaterThan(0);
  });

  it('updates an existing person', () => {
    const person = service.update(1, 'Jane Smith');

    expect(person).toEqual({ id: 1, name: 'Jane Smith' });
  });

  it('deletes an existing person', () => {
    const deleted = service.delete(1);

    expect(deleted).toBe(true);
  });
});
