import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './backend/models/User.js';

dotenv.config();

const run = async () => {
    try {
        console.log('Connecting to DB...');
        // We assume MONGODB_URI is in .env
        if (!process.env.MONGODB_URI) {
            console.error('MONGODB_URI not found in env');
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected.');

        console.log('Creating test user...');
        const email = `debug_${Date.now()}@test.com`;
        const password = 'password123';

        // Note: we are NOT hashing here, just testing the save mechanism
        const newUser = new User({
            email,
            password,
            role: 'admin'
        });

        console.log('Saving user...');
        await newUser.save();
        console.log('User saved successfully!');

        await User.deleteOne({ email });
        console.log('Cleaned up.');

    } catch (error) {
        console.error('SAVE FAILED:', error);
    } finally {
        await mongoose.disconnect();
    }
};

run();
