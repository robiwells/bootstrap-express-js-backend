import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config(); 

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello there!');
});

app.use((err: Error, req: Request, res: Response, _next: NextFunction): void => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
