import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { studentsRoutes } from './app/modules/student/student.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', studentsRoutes);

const getAController = (req: Request, res: Response) => {
  // const a = 10;
  console.log('Happy coding');
  // res.send(a);
  res.json({
    message: 'get the data',
  });
};
app.post('/api/v1/students', (req: Request, res: Response) => {
  console.log(req.body);
  res.json({
    message: 'students data the data',
  });
});
app.get('/', getAController);
app.post('/', (req: Request, res: Response) => {
  console.log(req.body);
  res.json({
    message: 'got the data',
  });
});

export default app;
