
import { logger } from 'libs/logger'
import { Response } from 'express';

interface ErrorHandler {
    handle: (error: Error, res: Response) => void;
}

class DefaultErrorHandler implements ErrorHandler {
    public handle(error: Error, res: Response) : void {
      logger.error(error.stack);
      //TODO: Add error handling logic (e.g. send email to admin)
      //TODO: Set relevant HTTP status code
      res.status(500).json({'error': true, 'message': error.message});
    };
}
  
export const errorhandler = new DefaultErrorHandler() as ErrorHandler;