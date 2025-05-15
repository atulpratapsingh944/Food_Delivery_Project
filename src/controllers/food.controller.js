const { secure } = require('../config/cloudinary');
const foodCollection =   require('../models/food.model');
const asyncHandler = require("express-async-handler");
const { uploadImgOnCloudinary } = require('../utils/cloudinary.utils');

exports.addFood = async (req, res) => {
    // console.log(req.file);

    const { name, description, price, category } = req.body;
const localFilePath = req.file.path;

let uploadResponse = await uploadImgOnCloudinary(localFilePath);
    console.log(uploadResponse);

    let newFood  = await foodCollection.create({    
        name,
        description,
        price,
        category,
        image:[{
            secure_url: uploadResponse.secure_url,
            public_id: uploadResponse.public_id,
            asset_id: uploadResponse.asset_id,
        },
    ],
        
    });
    res.json({
        status: "success",
        message: "Food added successfully",
        data: newFood,
    });
 };

 exports.updateFoodDetails = asyncHandler(async (req, res) => {});

 exports.updateFoodImage = asyncHandler(async (req, res) => {});

 exports.deleteFood = asyncHandler(async (req, res) => {});

 exports.getFoods = asyncHandler(async (req, res) => {
    let foods = await foodCollection.find();
    if(foods.length === 0) throw new Error("No foods found",404);
    res.json({
        status: "success",
        message: "Foods fetched successfully",
        data: foods,
    });
 });

 exports.getSingleFood = asyncHandler(async (req, res) => {});
