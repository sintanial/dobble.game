var util = require('util');

function ClientError(message, code, data) {
    Error.call(this); //super constructor
    Error.captureStackTrace(this, this.constructor); //super helper method to include stack trace in error object
    this.name = this.constructor.name; //set our function’s name as error name.

    if (typeof message === 'object') {
        this.message = message.message;
        this.code = message.code;
        this.data = message.data;
    } else {
        this.message = message; //set the error message
        this.code = code;
        this.data = data;
    }
}

util.inherits(ClientError, Error);

ClientError.prototype.toString = function () {
    return JSON.stringify({message: this.message, code: this.code, data: this.data});
};

module.exports = ClientError;