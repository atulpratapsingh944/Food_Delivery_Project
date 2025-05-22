const { Router } = require('express');  
const {placeOrder} = require('../controllers/order.controller');    
const {authenticate} = require('../middlewares/authenticate.middleware');
const router = Router();

router.post('/create-order', authenticate, placeOrder);

module.exports = router;