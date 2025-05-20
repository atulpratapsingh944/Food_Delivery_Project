const {Router} = require("express");
const {authenticate}= require("../middlewares/authenticate.middleware");
const { addFoodToCart ,removeFoodFromCart, getCartItems}= require("../controllers/cart.controller")

const router = Router();

router.patch("/add-to-cart",authenticate,addFoodToCart);

router.patch("/remove-from-cart", authenticate, removeFoodFromCart);

router.get("/get-Cart", authenticate, getCartItems);

module.exports = router;
