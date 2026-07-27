import type { NextFunction, Request, Response } from 'express';

export const requestIdMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  req.headers['x-request-id'] = crypto.randomUUID();
  next();
};
