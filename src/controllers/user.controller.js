const userCollection = require('../models/user.model');
const asyncHandler = require('express-async-handler');
const ErrorHandler  = require("../utils/errorHandler")

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;


    let existingUser = await userCollection.findOne({ email});
    if (existingUser) throw new ErrorHandler("email already exists",400);

    let newUser = await userCollection.create({ name, email, password });
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

    res.status(200).json({
           success: true,
           message: "user logged in successfully",
    });
 });


 module.exports = {
    registerUser,loginUser};