import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import orderRoutes from './routes/orders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import authRoutes from './routes/auth.js';
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

// Health Check Route
app.get('/', (req, res) => {
    res.json({
        status: 'running',
        db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

// Start Server irrespective of DB connection (for better debugging)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
