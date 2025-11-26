import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Basic API routes
app.get('/api', (req, res) => {
  res.json({ message: 'BloodLink Local API' });
});

// TODO: Add authentication routes
// TODO: Add user routes
// TODO: Add inventory routes
// TODO: Add donation request routes

// Start server
app.listen(PORT, () => {
  console.log(`🩸 BloodLink Backend running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
