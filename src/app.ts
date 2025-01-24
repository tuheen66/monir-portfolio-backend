import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BicycleRoutes } from './app/modules/bicycles/bicycle.route';
import { AuthRoutes } from './app/modules/auth/auth.route';
import globalErrorhandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();


//parser

app.use(express.json());
app.use(cors());

app.use('/api/auth', AuthRoutes);
app.use('/api/products', BicycleRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send({
        status: true,
        message: 'Server is running 🏃‍♂️',
      });
});

app.use(globalErrorhandler);
app.use(notFound);


export default app;
