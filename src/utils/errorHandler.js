class ErrorHandler extends Error{
    constructor(message,statusCode){
        super();//this will call the constructor of parents class ---> Error
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ErrorHandler;

// ! to generate a customer error