import express, { Request, Response } from 'express';
import 'dotenv/config'
import connectDb from './config/dbConfig';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import questionRoutes from './routes/questionRoutes';
import testRoutes from './routes/testRoutes';
import submissionRoutes from './routes/submissionRoutes';

//setting express and fetching port from .env
const app = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
app.use(express.json());
app.use(cors())

//establishing connection from MongoDB
connectDb();


//setting routes
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Testing API');
});

app.use('/api', userRoutes); // setting user routes
app.use('/api', questionRoutes); // setting question routes
app.use('/api', testRoutes); // setting test routes
app.use('/api', submissionRoutes); // setting submission routes


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});