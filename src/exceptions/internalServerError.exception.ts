import { INTERNAL_SERVER_ERROR } from "../constants/errorStatusCodes.constant";
import BaseException, { ErrorCode } from "./base.exception";

class InternalServerErrorException extends BaseException {
    constructor(message = "An error occured") {
        super(message, ErrorCode.INTERNAL_SERVER, INTERNAL_SERVER_ERROR)
    }
}


export default InternalServerErrorException;