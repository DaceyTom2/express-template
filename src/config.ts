import { z } from 'zod';

const envSchema = z.object({
  PORT: z
    .string()
    .default('3000')
    .transform((value) => Number(value))
    .pipe(z.number().int().positive()),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PINO_LOG_LEVEL: z.string().default('info'),
  PINO_LOG_CONSOLE: z
    .string()
    .default('true')
    .transform((value) => value === 'true')
    .pipe(z.boolean()),
  PINO_LOG_FILE: z
    .string()
    .default('false')
    .transform((value) => value === 'true')
    .pipe(z.boolean()),
  CORS_ORIGIN: z.string().default('*'),
  RATE_LIMIT_WINDOW_MS: z
    .string()
    .default('900000')
    .transform((value) => Number(value))
    .pipe(z.number().int().positive()),
  RATE_LIMIT_MAX: z
    .string()
    .default('100')
    .transform((value) => Number(value))
    .pipe(z.number().int().positive()),
  BODY_LIMIT: z.string().default('1mb'),
});

export const config = envSchema.parse(process.env);
