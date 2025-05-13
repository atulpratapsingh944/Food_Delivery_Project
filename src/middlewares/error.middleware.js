const { JsonWebTokenError } = require("jsonwebtoken");

const error = (err,req,res,next) =>{ 
    // ! validator error 
    if (err.name == "ValidationError"){
        err.statusCode = 400;
        err.message = Object.values(err.errors).map((ele) => ele.message);
    }


// ! jsonweb token error
if(err.name === "JsonWebTokenError"){
    err.statusCode = 401;
    err.message = " please login again ";
}
    // ! global error handler
    err.message = err.message || "Internal server Error ";
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        success: false,
        message:err.message,
        // errObj: err,
    });
};

module.exports = error;

//! types of error--->
// obj1 ==> new Error()
// Obj2 ==> new Error("",number)