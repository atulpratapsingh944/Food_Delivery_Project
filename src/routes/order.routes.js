const { Router } = require('express');  
const {placeOrder, verifyOrder, getOrder} = require('../controllers/order.controller');    
const {authenticate} = require('../middlewares/authenticate.middleware');
const router = Router();

router.post('/create-order', authenticate, placeOrder);

router.patch('/verify-order', authenticate, verifyOrder);

router.get('/get-order', authenticate, getOrder);

module.exports = router;