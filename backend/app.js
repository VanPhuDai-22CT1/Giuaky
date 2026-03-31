// app.js
// Entry point for backend (Node.js example)

const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');
require('dotenv').config();

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.json());
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Personal info endpoint
app.get('/about', (req, res) => {
  res.json({
    name: process.env.FULL_NAME || 'Văn Phú Đại',
    mssv: process.env.MSSV || '2251220039',
    class: process.env.CLASS || 'CDCNM',
    appName: process.env.APP_NAME || 'Mini Project'
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});