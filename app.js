const express = require('express');
require('dotenv').config();

const userRoutes = require('./src/routes/user.routes');
const error = require('./src/middlewares/error.middleware');
const cokkieParser = require('cookie-parser');
const app = express();

// ! middlewares section
app.use(express.json());
app.use(cokkieParser());

app.use("/users/v1", userRoutes);

// ! errror middleware
app.use(error);
module.exports = app;