import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();


//parser

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send({
        status: true,
        message: 'Server is running 🏃‍♂️',
      });
});



export default app;
