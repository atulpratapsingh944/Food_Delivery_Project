const { Router } =  require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/user.controller');
const { authenticate } = require('../middlewares/authenticate.middleware');
const router = Router();

router.post('/register', registerUser);
router.get("/login",loginUser);
router.get("/logout",authenticate, logoutUser);

module.exports = router;