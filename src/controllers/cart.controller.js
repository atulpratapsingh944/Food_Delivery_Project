const foodCollection = require("../models/food.model");
const userCollection = require("../models/food.model")
const asyncHandler = require("express-async-handler");

const addFoodToCart = asyncHandler(async (req,res)=>{
    let foodId = req.body.foodId;
    let loggedInUser = req.myUser;
    let  cartData  = loggedInUser.cartData;
    
//cart = {}
    if(cartData[foodId]){
        cartData[foodId] +=  1;
    }
    else {
        cartData[foodId] = 1; }

    let updatedCart = await foodCollection.findByIdAndUpdate(
        loggedInUser._id,
        {cartData},
        // {new: true}, //it will return updated document
    );

    await req.myUser.save();

    res.status(200).json({
        success: true,
        message: "food added to cart",
    });
});

const removeFoodFromCart = asyncHandler(async (req,res)=>{
     let foodId = req.body.foodId;
    let loggedInUser = req.myUser;
    let  cartData  = loggedInUser.cartData;

    if (cartData[foodId] > 1 )cartData[foodId] -= 1;
    await userCollection.findByIdAndUpdate(loggedInUser._id,{cartData});

    res.status(200).json({
        success: true,
        message: " food removed from cart",
    });
})

const getCartItems = asyncHandler(async (req,res)=>{
    let loggedInUser = req.myUser;
    console.log(Object.keys(loggedInUser.cartData).length);
    let keysArray = Object.keys(loggedInUser.cartData);
    if (keysArray.length === 0 ) throw new ErrorHandler("cart is empty", 404);

    let valueArray = Object.values(loggedInUser.cartData);
    let items = valueArray.reduce((acc, curr) => acc + curr, 0);
    res.status(200).json({
        success: true,
        items : items,
        cart: loggedInUser.cartData,
    });
});

module.exports = {
    addFoodToCart,removeFoodFromCart,  getCartItems
};