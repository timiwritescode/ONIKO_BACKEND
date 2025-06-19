import { STATUS_FORBIDDEN } from "../constants/errorStatusCodes.constant";
import BaseException, { ErrorCode } from "./base.exception";

class ForbiddenException extends BaseException{
    constructor(message = "Resource forbidden") {
        super(message, ErrorCode.FORBIDDEN, STATUS_FORBIDDEN)
    }
}


export default ForbiddenException;