import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

// application routes
app.use('/api/v1', router);

const getAController = async (req: Request, res: Response) => {
  res.json({
    message: 'get the data',
  });
};
app.get('/', getAController);

// set global error
app.use(globalErrorHandler);
app.use(notFound);

export default app;
