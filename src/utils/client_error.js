const AppError = require("./error_handler");
const { StatusCodes } = require("http-status-codes");

class ClientError extends AppError {
    constructor(name, message, description, statusCode){
        super(
            name,
            message,
            description,
            statusCode,
        );
    }
}


module.exports = ClientError;