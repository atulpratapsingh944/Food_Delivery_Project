const { Router } =  require('express');
const { registerUser, loginUser } = require('../controllers/user.controller');
const router = Router();

router.post('/register', registerUser);
router.get("/login",loginUser);

module.exports = router;