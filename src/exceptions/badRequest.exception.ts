
import { BAD_REQUEST } from "../constants/errorStatusCodes.constant";
import BaseException, { ErrorCode } from "./base.exception";


class BadRequestEsxception extends BaseException {
    constructor(
        message: string) {
        super(
            message, 
            ErrorCode.BAD_REQUEST, 
            BAD_REQUEST)
    }
}


export default BadRequestEsxception