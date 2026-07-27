import express, { NextFunction, Request, Response } from 'express';
import pino from 'pino';
import v1PersonRouter from './routes/v1/person.js';
import v2PersonRouter from './routes/v2/person.js';
import logger from './logger/logger.js';

const app = express();

app.use(express.json());

app.use((req: Request, _res: Response, next: NextFunction): void => {
  logger.info({ method: req.method, url: req.url }, 'request received');
  next();
});

app.get('/', (_req: Request, res: Response): void => {
  logger.info('root route accessed');
  res.send('Hello from Express!');
});

app.use('/v1/person', v1PersonRouter);
app.use('/v2/person', v2PersonRouter);

export { app };
