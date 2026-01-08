import express from 'express';
import dotenv from 'dotenv';
import cookieparser  from 'cookie-parser';
import connectDB from './db/db.js';
import userRoute from './routes/auth.routes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieparser());

app.use('/api/auth', userRoute);

app.use(errorHandler);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})