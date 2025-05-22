const orderCollection = require('../models/order.model');
const userCollection = require('../models/user.model');
let foodCollection = require('../models/food.model');
const asyncHandler = require('express-async-handler');

const placeOrder = asyncHandler(async (req, res) => {
    // ! Current Logged in user
    const currentUser = req.myUser;


    // ! get the cart data of the current logged in user 
    const cartData = currentUser.cartData;

    // ! address of the current logged in user
    const {address} = req.body;


    // ! cart data of the current logged in user
    // console.log(currentUser.cartData);

    // ! extracting food ids from the cart data into an Array
    let foodIds = Object.keys(currentUser.cartData);
    


// ! using the food ids to get the food items from the food collection
    let  foodItems = await foodCollection.find({_id: {$in: foodIds}});
    // console.log(foodItems);
    console.log(cartData);


    let  items = [];
    let total = 0;


for (let foodItem of foodItems) {
    // console.log(foodItem);
    let quantity = cartData[foodItem._id]; 
    let price = foodItem.price;
    let itemPrice = quantity * price;


    total += itemPrice;

    total += price * quantity;
    
    items.push({
        food : foodItem.name,
        quantity: quantity,
        price: itemPrice,
        // total,
    });
}
console.log(items);
});

module.exports = {
    placeOrder

};
    