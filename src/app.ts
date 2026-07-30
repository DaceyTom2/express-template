import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { config } from './config.js';
import logger from './logger/logger.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { requestIdMiddleware } from './middleware/requestId.js';
import v1PersonRouter from './routes/v1/person.js';
import v2PersonRouter from './routes/v2/person.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.CORS_ORIGIN === '*' ? true : config.CORS_ORIGIN }));
app.use(express.json({ limit: config.BODY_LIMIT }));
app.use(requestIdMiddleware);

app.use((req: Request, _res: Response, next: NextFunction): void => {
  logger.info(
    { method: req.method, url: req.url, requestId: req.headers['x-request-id'] },
    'request received',
  );
  next();
});

app.get('/', (_req: Request, res: Response): void => {
  logger.info('root route accessed');
  res.send('Hello from Express!');
});

app.use((err: Error, _req: Request, _res: Response, next: NextFunction): void => {
  logger.error({ err }, 'unhandled application error');
  next(err);
});

app.use('/v1/person', v1PersonRouter);
app.use('/v2/person', v2PersonRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
