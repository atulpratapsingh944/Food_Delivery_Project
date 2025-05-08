const express = require('express');
require('dotenv').config();

const userRoutes = require('./src/routes/user.routes');
const error = require('./src/middlewares/error.middleware');
const app = express();

// ! middlewares section
app.use(express.json());

app.use("/users/v1", userRoutes);

// ! errror middleware
app.use(error);
module.exports = app;