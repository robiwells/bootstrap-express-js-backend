import './paths';
import routes from './routes';
import express, { Request, Response, NextFunction } from 'express';
import { logger } from 'libs/logger';
import { errorhandler } from 'libs/error-handler';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false // Disable the `X-RateLimit-*` headers.
});

app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());

app.use((req: Request, _res: Response, next: NextFunction) => {
  // Log an info message for each incoming request
  logger.info(`Received a ${req.method} request for ${req.url}`);
  next();
});

app.use('/api', routes);

app.use((_req: Request, res: Response): void => {
  const errorWrapper = new Error('Route not found');
  errorhandler.handle(errorWrapper, res);
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  errorhandler.handle(err, res);
});

app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});
