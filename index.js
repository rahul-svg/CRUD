const express = require('express');
const dotenv = require('dotenv');
require('dotenv').config();
const connectDB = require('./config/db');
const db = process.env.mongoURI;
const PORT = process.env.PORT || 3000;

const app = express();
const router = require('./routes/post');
const authRoutes = require('./routes/auth');
const emailRoutes = require('./routes/email');



// Middlewares
app.use(express.json());
app.use(router);
app.use(authRoutes);
app.use(emailRoutes);

// DB Connect
connectDB(db);



app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})