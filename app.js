const express = require('express');
require('dotenv').config();

const userRoutes = require('./src/routes/user.routes');
const foodRoutes = require('./src/routes/food.routes');
const cartRoutes = require("./src/routes/cart.routes")
const error = require('./src/middlewares/error.middleware');
const cokkieParser = require('cookie-parser');
const app = express();

// ! middlewares section
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cokkieParser());

app.use("/users/v1", userRoutes);
app.use("/foods/v1", foodRoutes);
app.use("/cart/v1", cartRoutes);

// ! errror middleware
app.use(error);
module.exports = app;