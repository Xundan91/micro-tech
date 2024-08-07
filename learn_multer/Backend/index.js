import express from 'express';
import connectDB from './database.js';
import imageRoutes from './routes/imageRoutes.js';
import cors from 'cors';

const PORT = 5000;
const app = express();
app.use(cors());
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/images', imageRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));