import { STATUS_UNAUTHOURIZED } from "../constants/errorStatusCodes.constant";
import BaseException, { ErrorCode } from "./base.exception";

class UnauthorizedException extends BaseException {
    constructor(message = "Unauthorized") {
        super(message, ErrorCode.BAD_REQUEST, STATUS_UNAUTHOURIZED
        )
    }
}


export default UnauthorizedException;