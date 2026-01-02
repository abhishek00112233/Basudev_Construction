import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production';

import nodemailer from 'nodemailer';
import OTP from '../models/OTP.js';

// Configure Nodemailer (ensure these valid in .env)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Send OTP
router.post('/send-otp', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP to DB (upsert if exists)
        await OTP.findOneAndUpdate(
            { email },
            { otp, createdAt: Date.now() },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        // Send Email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Basudev Construction - Registration OTP',
            text: `Your OTP for Registration is: ${otp}. It expires in 5 minutes.`
        };

        console.log(`------------------------------------------------`);
        console.log(`[DEV MODE] OTP for ${email}: ${otp}`);
        console.log(`------------------------------------------------`);

        try {
            await transporter.sendMail(mailOptions);
            res.json({ message: 'OTP sent successfully to your email', otp: otp });
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
            res.json({ message: `OTP sent (Email failed). Use code: ${otp}`, otp: otp });
        }

    } catch (error) {
        console.error('Send OTP Error:', error);
        res.status(500).json({ message: 'Failed to send OTP', error: error.message });
    }
});

// Register with OTP
router.post('/register', async (req, res) => {
    console.log('Register route hit');
    try {
        const { email, password, otp } = req.body;
        console.log('Body:', { email, hasPassword: !!password, otp });

        // Verify OTP
        console.log('Verifying OTP...');
        const validOTP = await OTP.findOne({ email, otp });
        console.log('OTP found:', !!validOTP);
        if (!validOTP) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Check if user exists (double check)
        console.log('Checking existing user...');
        const existingUser = await User.findOne({ email });
        console.log('User found:', !!existingUser);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash Password manually
        console.log('Hashing password...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('Password hashed');

        // Create new user (default to user)
        const newUser = new User({
            email,
            password: hashedPassword,
            role: 'user' // Default to user
        });

        console.log('Saving user...');
        await newUser.save();
        console.log('User saved');

        // Delete OTP after successful registration
        console.log('Deleting OTP...');
        await OTP.deleteOne({ email });
        console.log('OTP deleted');

        res.status(201).json({ message: 'Account created successfully! Please login.' });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password manually
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate Token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
