
// Utility class to generate custom exception while an erro occurs
class ErrorHandler extends Error{
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler