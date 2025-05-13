const userCollection = require('../models/user.model');
const asyncHandler = require('express-async-handler');
const ErrorHandler  = require("../utils/errorHandler");
const { generateToken } = require('../utils/jwt.utils');

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password,phoneNumber } = req.body;


    let existingUser = await userCollection.findOne({ email});
    if (existingUser) throw new ErrorHandler("email already exists",400);

    let newUser = await userCollection.create({ name, email, password,phoneNumber });
    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: newUser,
    });
 });


 const loginUser = asyncHandler(async (req,res)=>{
    let {email,password} = req.body;

    // ! check if email exists in DB 
    let existingUser = await userCollection.findOne({ email });
    if(!existingUser) throw new ErrorHandler("please ragister first",400);

    //! match the password
    let isMatched = await existingUser.comparePassword(password);
    if(!isMatched) throw new ErrorHandler("invalid credentials",400);

    let token = await generateToken(existingUser._id,existingUser.tokenVersion);
      res.cookie("myCookie",token,{
         secure: true,
         httpOnly: true,
         maxAge: 1 * 60 * 60 * 1000, // maxAge => in milliseconds (cookie will expire in one hour)
      });   

    res.status(200).json({
           success: true,
           message: "user logged in successfully",
           token,
    });
 });

 const logoutUser  = asyncHandler(async (req,res)=>{
   res.clearCookie("myCookie");
   await userCollection.findByIdAndUpdate(
      req.myUser._id,
      { $inc: { tokenVersion: 1 } }, // increment the token version by 1
   );
   res.status(200).json({
       success: true,
       message: "user logged out successfully",
   });   
 });

 const updateUserProfile = asyncHandler(async (req,res)=>{ 
   const { _id} = req.myUser;
   const { name, email, phoneNumber } = req.body;

   const updateUser = await userCollection.findByIdAndUpdate(
      { _id },
      {$set: { name, email, phoneNumber } },
      {new : true}
   );
   res.status(200).json({  
       success: true,
       message: "user updated successfully",
       data: updateUser,
   });
 });//we can update name email and phone number


 const updateUserPassword = asyncHandler(async (req,res)=>{
   let { newPassword } = req.body;


   let user =  await userCollection.findById(req.myUser._id); // authenticate middleware
   user.password = newPassword;//assigning the value
   await user.save();//save the data in the db and save will be 


   res.status(200).json({
      success: true,
      message: "password updated successfully",
   });
 });//todo

const deleteUserProfile = asyncHandler(async (req,res)=>{
   const {_id } = req.myUser;//this will get from authenticate middleware
   const deleteUser = await userCollection.findByIdAndDelete(_id); //findOne and deleteOne 
   if(!deleteUser) throw new ErrorHandler("user not found",404);
   res.status(200).json({
       success: true,
       message: "user deleted successfully",
       data: deleteUser,
   });
});// delete  the profile

const  getLoggedInUserProfile = asyncHandler(async (req,res)=>{
   res.status(200).json({
       success: true,
       userDetails : req.myUser,
   });
});

const getCurrentUserProfile =  asyncHandler(async (req,res)=>{});// in the frontend



 module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    updateUserProfile,
    updateUserPassword,
    deleteUserProfile,
    getCurrentUserProfile,
     getLoggedInUserProfile
   };
