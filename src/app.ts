import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BicycleRoutes } from './app/modules/bicycles/bicycle.route';

const app: Application = express();


//parser

app.use(express.json());
app.use(cors());

app.use('/api/products', BicycleRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send({
        status: true,
        message: 'Server is running 🏃‍♂️',
      });
});



export default app;
