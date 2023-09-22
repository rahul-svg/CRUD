const express = require('express');
const dotenv = require('dotenv');
require('dotenv').config();
const connectDB = require('./config/db');
const db = process.env.mongoURI;
const PORT = process.env.PORT

const app = express();
const router = require('./routes/post');

// Middlewares
app.use(express.json());
app.use(router);

// DB Connect
connectDB(db);



app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})