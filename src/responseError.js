class ResponseError extends Error {
    constructor(status, message) {
        super(message);
        this.code = 1 //Unsuccessful request or Error
        this.httpStatusCode = status;
        this.message = message;
      }
}

module.exports = ResponseError;