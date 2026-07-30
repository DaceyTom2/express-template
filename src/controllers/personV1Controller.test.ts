import type { Request, Response } from 'express';
import { describe, expect, it, vi } from 'vitest';
import { PersonV1Controller } from './personV1Controller.js';

describe('PersonV1Controller', () => {
  it('returns all people', () => {
    const controller = new PersonV1Controller();
    const req = {} as Request;
    const res = {
      json: vi.fn(),
    } as unknown as Response;

    controller.getAll(req, res);

    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Jane Doe' }]);
  });

  it('returns 404 when a person is missing', () => {
    const controller = new PersonV1Controller();
    const req = { params: { id: '999' } } as unknown as Request<{ id: string }>;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    controller.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Person not found' });
  });
});
