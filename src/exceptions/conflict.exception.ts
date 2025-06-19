import { STATUS_CONFLICT } from "../constants/errorStatusCodes.constant";
import BaseException, { ErrorCode } from "./base.exception";

class ConflictException extends BaseException {
    constructor(message: string) {
        super(message, ErrorCode.CONFLICT, STATUS_CONFLICT)
    }
}


export default ConflictException;