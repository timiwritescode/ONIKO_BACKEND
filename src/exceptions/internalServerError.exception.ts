import { STATUS_INTERNAL_SERVER_ERROR } from "../constants/errorStatusCodes.constant";
import BaseException, { ErrorCode } from "./base.exception";

class InternalServerErrorException extends BaseException {
    constructor(message = "An error occured") {
        super(message, ErrorCode.INTERNAL_SERVER, STATUS_INTERNAL_SERVER_ERROR)
    }
}


export default InternalServerErrorException;