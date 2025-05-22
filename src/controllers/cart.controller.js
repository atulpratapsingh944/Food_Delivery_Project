const foodCollection = require("../models/food.model");
const userCollection = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");

const addFoodToCart = asyncHandler(async (req, res) => {
  let foodId = req.body.foodId;
  let loggedInUser = req.myUser;
  let cartData = loggedInUser.cartData; // nested object/doc

  if (cartData[foodId]) {
    cartData[foodId] += 1;
  } else {
    cartData[foodId] = 1;
  }
  //   await userCollection.updateOne({ _id: loggedInUser._id }, { $set: { cartData } });
  await userCollection.findByIdAndUpdate(
    loggedInUser._id,
    { cartData }
    // { new: true } // it will return the updated document
  );

  res.status(200).json({
    success: true,
    message: "food added to cart",
  });
});

const removeFoodFromCart = asyncHandler(async (req, res) => {
  let foodId = req.body.foodId;
  let loggedInUser = req.myUser;
  let cartData = loggedInUser.cartData;

  if (cartData[foodId] === undefined) throw new ErrorHandler("food not found in cart", 404);

  if (cartData[foodId] > 1) cartData[foodId] -= 1;
  else delete cartData[foodId];

  await userCollection.findByIdAndUpdate(loggedInUser._id, { cartData });

  res.status(200).json({
    success: true,
    message: "food removed from cart",
  });
});

const getCartItems = asyncHandler(async (req, res) => {
  let loggedInUser = req.myUser;

  console.log(Object.keys(loggedInUser.cartData));
  let keysArray = Object.keys(loggedInUser.cartData);
  if (keysArray.length === 0) throw new ErrorHandler("cart is empty", 404);

  let valueArray = Object.values(loggedInUser.cartData);
  let items = valueArray.reduce((acc, curr) => acc + curr, 0);

  res.status(200).json({
    success: true,
    items: items,
    cart: loggedInUser.cartData,
  });
});

module.exports = {
  addFoodToCart,
  removeFoodFromCart,
  getCartItems,
};