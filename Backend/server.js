import dns from 'node:dns/promises';

dns.setServers(['1.1.1.1', '1.0.0.1']);

import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';

import { notFound, errorHandler } from './middleware/errorHandler.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Main route
app.get('/', (req, res) => {
    res.send('Fast Food API is running...');
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Error middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(port, () =>
    console.log(`Server is running on port ${port}`)
);