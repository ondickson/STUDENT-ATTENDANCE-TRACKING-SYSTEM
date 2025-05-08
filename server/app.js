const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/attendance', require('./routes/attendanceRoutes'));

module.exports = app;
