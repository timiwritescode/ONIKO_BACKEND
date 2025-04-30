import { FORBIDDEN } from "../constants/errorStatusCodes.constant";
import BaseException, { ErrorCode } from "./base.exception";

class ForbiddenException extends BaseException{
    constructor(message = "Resource forbidden") {
        super(message, ErrorCode.FORBIDDEN, FORBIDDEN)
    }
}


export default ForbiddenException;