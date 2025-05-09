const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const generateToken = asyncHandler(async (id, tokenVersion)=>{
    let token = jwt.sign({id,tokenVersion},"secret-key",{
        expiresIn:"1d",
    });
    return token;
});

module.exports = { generateToken };