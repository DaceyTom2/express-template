import { z } from 'zod';

export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'id must be a number'),
});

export const createPersonV1Schema = z.object({
  name: z.string().trim().min(1, 'name is required'),
});

export const createPersonV2Schema = z.object({
  firstName: z.string().trim().min(1, 'firstName is required'),
  middleName: z.string().trim().optional().default(''),
  lastName: z.string().trim().min(1, 'lastName is required'),
});
