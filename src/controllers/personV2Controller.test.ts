import type { Request, Response } from 'express';
import { describe, expect, it, vi } from 'vitest';
import { PersonV2Controller } from './personV2Controller.js';

describe('PersonV2Controller', () => {
  it('returns all people', () => {
    const controller = new PersonV2Controller();
    const req = {} as Request;
    const res = {
      json: vi.fn(),
    } as unknown as Response;

    controller.getAll(req, res);

    expect(res.json).toHaveBeenCalledWith([
      {
        id: 1,
        firstName: 'Jane',
        middleName: 'Marie',
        lastName: 'Doe',
      },
    ]);
  });

  it('returns 400 for invalid input', () => {
    const controller = new PersonV2Controller();
    const req = { body: { firstName: '' } } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    controller.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'firstName is required' });
  });
});
