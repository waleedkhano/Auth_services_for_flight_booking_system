const AppError = require("./error_handler");
const { StatusCodes } = require("http-status-codes");

class ValidationError extends AppError {
    constructor(error){
        let errorName = error.name;
        let description = [];
        error.errors.forEach((err) => {
            description.push(err.message);
        });
        super(
            errorName,
            'Not able to validate data send in the request',
            description,
            StatusCodes.BAD_REQUEST,
        );
    }
}


module.exports = ValidationError;