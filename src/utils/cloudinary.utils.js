const asyncHandler = require("express-async-handler");
const { cloudinary } = require("../config/cloudinary");  

const cloud = require("cloudinary");
console.log(cloudinary);

let uploadImgOnCloudinary = asyncHandler(async (path) => {
    let result = await cloud.uploader.upload(path); 
    console.log(result);
});

module.exports = { uploadImgOnCloudinary };