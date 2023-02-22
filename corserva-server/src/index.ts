import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './routes/index';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: true
  })
);

const PORT = process.env.SERVER_PORT;

app.get('/', (req: Request, res: Response) => {
  return res.send('HELLO FROM EXPRESS');
});

app.use(router);
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
