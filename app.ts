import express, { NextFunction, Request, Response } from 'express';
import pino from 'pino';
import v1PersonRouter from './routes/v1/person.js';
import v2PersonRouter from './routes/v2/person.js';

const logger = pino({
  transport: process.env.NODE_ENV !== 'production'
    ? { target: 'pino-pretty', options: { colorize: true } }
    : undefined,
});

const app = express();
const port: number = Number(process.env.PORT) || 3000;

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

app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
