const { Router } =  require('express');
const { registerUser, loginUser, logoutUser, deleteUserProfile, getLoggedInUserProfile , updateUserProfile, updateUserPassword} = require('../controllers/user.controller');
const { authenticate } = require('../middlewares/authenticate.middleware');
const router = Router();

router.post('/register', registerUser);
router.get("/login",loginUser);
router.get("/logout",authenticate, logoutUser);
router.delete("/delete-me",authenticate, deleteUserProfile);
router.get("/me", authenticate, getLoggedInUserProfile);
router.patch("/update", authenticate, updateUserProfile);
router.patch("/update-password", authenticate, updateUserPassword);
module.exports = router;