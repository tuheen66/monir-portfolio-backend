import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BicycleRoutes } from './app/modules/bicycles/bicycle.route';
import { AuthRoutes } from './app/modules/auth/auth.route';
import globalErrorhandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import { OrderRoutes } from './app/modules/orders/order.route';

const app: Application = express();

//parser

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/api/auth', AuthRoutes);
app.use('/api/products', BicycleRoutes);
app.use('/api/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server is running 🏃‍♂️',
  });
});

app.use(globalErrorhandler);
app.use(notFound);

export default app;
