const { Router } = require('express');
const {  addFood, getFoods, deleteFood, updateFoodDetails, updateFoodImage, getSingleFood } = require('../controllers/food.controller');
const { upload } = require('../middlewares/multer.middleware');
const router = Router();

router.post('/add-food', upload.single("image") , addFood);

router.get('/all-foods', getFoods);

router.delete('/delete-food/:id', deleteFood);

router.patch('/update-food/:id', upload.single("image") , updateFoodImage);

router.patch('/update-foods/:id', updateFoodDetails);

router.get("/single-food/:id",getSingleFood);


module.exports = router;