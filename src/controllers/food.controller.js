const { secure } = require('../config/cloudinary');
const foodCollection =   require('../models/food.model');
const asyncHandler = require("express-async-handler");
const { uploadImgOnCloudinary  , deleteImageFromCloudinary } = require('../utils/cloudinary.utils');

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

 exports.updateFoodDetails = asyncHandler(async (req, res) => {
    let { name, description, price, category } = req.body;
    let updateFood = await foodCollection.findByIdAndUpdate(
        req.params.id,
        {
            name,
            description,
            price,
            category,
        },
        { new: true }
    );
    if (!updateFood) throw new Error("Food not found", 404);
    res.json({
        status: "success",
        message: "Food updated successfully",
        data: updateFood,
    });
 });

 exports.updateFoodImage = asyncHandler(async (req, res) => {
    let { id } = req.params;
    let food = await foodCollection.findById(id);
    let public_id = food?.image[0]?.public_id;
    console.log(public_id);
    if(public_id !==  undefined || public_id!== null){
    let deleteImage = await deleteImageFromCloudinary(public_id);
    }
    let localFilePath = req.file.path;
    let uploadResponse = await uploadImgOnCloudinary(localFilePath);
    food.image = [
        {
            secure_url: uploadResponse.secure_url,
            public_id: uploadResponse.public_id,
            asset_id: uploadResponse.asset_id,
        },
    ];
    await food.save();
    res.json({
        status: "success",
        message: "Food image updated successfully",
        data: food,
    });
 });

 exports.deleteFood = asyncHandler(async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    let food = await foodCollection.findById({_id: id});
    let public_id = food.image[0].public_id;
    let deleteImage = await deleteImageFromCloudinary(public_id);
    let deleteFood = await foodCollection.findByIdAndDelete( id );
    
    res.json({
        status: true,
        message: "Food deleted successfully",
        data: deleteFood,
    });
 });

 exports.getFoods = asyncHandler(async (req, res) => {
    let foods = await foodCollection.find();
    if(foods.length === 0) throw new Error("No foods found",404);
    res.json({
        status: "success",
        message: "Foods fetched successfully",
        data: foods,
    });
 });

 exports.getSingleFood = asyncHandler(async (req, res) => {
    console.log(req.params);
    let extractId = req.params.id;
    console.log(extractId);
    let food = await foodCollection.findOne({ _id: extractId });
    if (!food) throw new Error("Food not found", 404);
    res.json({
        status: "success",
        message: "Food fetched successfully",
        data: food,
    });

 });
