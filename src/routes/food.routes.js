const { Router } = require('express');
const { addFood} = require('../controllers/food.controller');
const { upload } = require('../middlewares/multer.middleware');
const router = Router();

router.post('/add-food', upload.single("image") , addFood);


module.exports = router;