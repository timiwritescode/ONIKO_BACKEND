import { NOT_FOUND } from "../constants/errorStatusCodes.constant";
import BaseException, { ErrorCode } from "./base.exception";

class NotFoundException extends BaseException {
    constructor(message: string) {
        super(
            message,
            ErrorCode.NOT_FOUND,
            NOT_FOUND
        )
    }
}


export default NotFoundException;

