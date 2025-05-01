import { CONFLICT } from "../constants/errorStatusCodes.constant";
import BaseException, { ErrorCode } from "./base.exception";

class ConflictException extends BaseException {
    constructor(message: string) {
        super(message, ErrorCode.CONFLICT, CONFLICT)
    }
}


export default ConflictException;