import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '../backend/routes/auth.js';
import orderRoutes from '../backend/routes/orders.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

app.get('/api', (req, res) => {
    res.send('Basudev/Balu Construction API Running');
});

// MongoDB Connection
// MongoDB Connection
let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return;
    }

    // Skip connection if no URI or using placeholder in production
    if (!process.env.MONGODB_URI || (process.env.NODE_ENV === 'production' && process.env.MONGODB_URI.includes('localhost'))) {
        console.log('Skipping MongoDB connection (Invalid URI or Placeholder)');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        });
        isConnected = db.connections[0].readyState;
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error (Non-fatal):', error.message);
        // Do not throw, allowing app to run in "offline" mode
    }
};

// Middleware to ensure DB is connected
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(500).json({ message: 'Database Connection Failed', error: error.message });
    }
});

// Serve static files from the 'dist' directory (Vite build)
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../dist')));

// Handle React routing, return all requests to React app
// Ensure this comes AFTER your API routes
// app.get('*', (req, res) => {
//     // Check if request is for API, if so don't return HTML (optional safety, though order matters more)
//     if (req.path.startsWith('/api')) {
//         return res.status(404).json({ message: 'API endpoint not found' });
//     }
//     res.sendFile(path.join(__dirname, '../dist', 'index.html'));
// });

// Connect on initialization (optional, but good for local)
connectDB().catch(console.error);

export default app;
