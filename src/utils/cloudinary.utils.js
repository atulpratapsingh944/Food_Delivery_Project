const asyncHandler = require("express-async-handler");
const { v2 } = require("../config/cloudinary"); 
const cloud = require("cloudinary"); 
const fs = require("fs");


const uploadImgOnCloudinary = asyncHandler(async (path) => {
    if(!path) return null;
    let uploadResponse = await cloud.uploader.upload(path,{
        folder: "bitByte",
    }); 
    
    fs.unlinkSync(path); // delete the file from local storage
    return uploadResponse;
});


const deleteImageFromCloudinary = asyncHandler (async (id)=>{
    let result = await cloud.uploader.destroy(id);
    return result;
})
  
module.exports = { uploadImgOnCloudinary, deleteImageFromCloudinary };