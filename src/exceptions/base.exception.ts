
abstract class BaseException extends Error {
    errorCode: ErrorCode
    statusCode: number


    constructor(
        message: string, 
        errorCode: ErrorCode, statusCode: number) {
            super(message),
            this.statusCode = statusCode
            this.errorCode = errorCode
        };
        
}


export enum ErrorCode {
    NOT_FOUND = 1001,
    FORBIDDEN = 1003,
    INTERNAL_SERVER = 1005,
    BAD_REQUEST = 1007,
    CONFLICT = 1009
}


export default BaseException;