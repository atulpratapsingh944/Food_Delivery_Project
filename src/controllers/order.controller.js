const orderCollection = require("../models/order.model");
const userCollection = require("../models/user.model");
const foodCollection = require("../models/food.model");
const asyncHandler = require("express-async-handler");
const { Stripe } = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = asyncHandler(async (req, res) => {
  //! current logged in user
  const currentUser = req.myUser;
  //   console.log(currentUser);
  //! get the cart details of current logged in user
  const cartData = currentUser.cartData;
  //! address of the current logged in user
  const { address } = req.body;
  //   console.log(req.body);

  //! extracting the keys from cart data into an array
  let foodIds = Object.keys(cartData);
  //   console.log(foodIds);
  //! using that array, finding all the food items
  let foodItems = await foodCollection.find({ _id: { $in: foodIds } });
  //   console.log(foodItems);
  console.log(cartData);
  console.log(foodItems);

  let items = [];
  let total = 0;

  for (let foodItem of foodItems) {
    // console.log(foodItem);
    let quantity = cartData[foodItem._id];
    let price = foodItem.price;
    let itemPrice = quantity * price;

    total += itemPrice;

    items.push({
      food: foodItem.name,
      quantity: quantity,
      price: itemPrice,
      //   total,
    });
    // console.log(items);
  }
  const newOrder = await orderCollection.create({
    userId: currentUser._id,
    items: items,
    amount: total,
    address: address,
  });

  const line_items = items.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.food,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  console.log(line_items);

  const session = await stripe.checkout.sessions.create({
    line_items,
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `http://localhost:9000/oreders/v1/verify-order?orderId=${newOrder._id}&success=true`,
    cancel_url: `http://localhost:9000/oreders/v1/verify-order?orderId=${newOrder._id}&success=false`,
  });

  console.log(session);

  res.status(200).json({
    success: true,
    message: "order placed successfully",
    sessionId: session.id,
    url: session.url,
  });
});

module.exports = {
  placeOrder,
};
