class ApiError extends Error {
    constructor(
        statusCode,
        message = "Somehting went wrong",
        errors=[],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = falsethis
        this.errors = errors
        if (stack) {
            this.stack = stack
        } else {
            error.captureStackTrace(this,this.constructor)            
        }
    }
}
module.exports = ApiError