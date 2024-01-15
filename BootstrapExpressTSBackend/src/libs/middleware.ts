import { Request, Response, NextFunction } from 'express';
import { validationResult, ResultFactory } from 'express-validator';
import { errorhandler } from './error-handler';

const myValidationResult: ResultFactory<string> = validationResult.withDefaults({
  formatter: (error) => error.msg as string
});

export const validationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const userReadable: string[] = myValidationResult(req).array();
    return errorhandler.handle(new Error('Validation error: ' + userReadable), res);
  }
  next();
};
