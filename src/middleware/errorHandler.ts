import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export const notFoundHandler = (_req: Request, res: Response, _next: NextFunction): void => {
  res.status(404).json({ message: 'Route not found' });
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const status = error.statusCode ?? 500;
  const message = error.message ?? 'Internal server error';

  res.status(status).json({ message });
};
