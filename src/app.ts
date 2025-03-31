import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { AuthRoutes } from './app/modules/auth/auth.route';
import globalErrorhandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import { ProjectRoutes } from './app/modules/projects/project.route';
import { MessageRoutes } from './app/modules/messages/message.route';
import { BlogRoutes } from './app/modules/blogs/blog.route';

const app: Application = express();

//parser

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use('/api/auth', AuthRoutes);
app.use('/api', ProjectRoutes);
app.use('/api', MessageRoutes);
app.use('/api', BlogRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server is running 🏃‍♂️',
  });
});

app.use(globalErrorhandler);
app.use(notFound);

export default app;
