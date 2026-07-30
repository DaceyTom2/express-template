import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from './app.js';

describe('GET /', () => {
  it('returns the home message', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toContain('Hello from Express!');
  });
});

describe('v1 person endpoints', () => {
  it('returns the v1 person list', async () => {
    const response = await request(app).get('/v1/person');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: 'Jane Doe' }]);
  });

  it('creates a person with a valid payload', async () => {
    const response = await request(app).post('/v1/person').send({ name: 'John Smith' });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ name: 'John Smith' });
  });
});

describe('v2 person endpoints', () => {
  it('returns the v2 person list', async () => {
    const response = await request(app).get('/v2/person');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        firstName: 'Jane',
        middleName: 'Marie',
        lastName: 'Doe',
      },
    ]);
  });

  it('rejects a v2 payload without required fields', async () => {
    const response = await request(app).post('/v2/person').send({ firstName: 'Jane' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});
