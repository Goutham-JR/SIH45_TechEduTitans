const express = require('express');
const connectDB = require('../config/db')
const cors = require('cors')

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

const authRoutes = require('../routers/auth');
app.use('/api/auth', authRoutes);

const PORT = 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));