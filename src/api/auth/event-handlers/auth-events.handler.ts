import { sendPasswordResetTokenMail, sendVerificationMail } from "../../../email/email.service";
import { ForgotPasswordEventPayload } from "../events/forgot-password.events";
import { eventDispatch } from "../../../events/eventDispatcher.util";
import { UserRequestVerificationEventPayload } from "../events/user-registed.event";
import { logger } from "../../../config/logger";


eventDispatch.on("auth:forgot-password-requested", async function (payload: ForgotPasswordEventPayload)  {
    try {
        console.log("Sending password reset token");
        await sendPasswordResetTokenMail(payload);
        console.log("Done sending password reset token")        
    } catch (error) {
        logger.error(error.message)
    }

})


eventDispatch.on("auth:user-registered", async function(payload: UserRequestVerificationEventPayload) {
    try {
        console.log("Sending verification password");
        await sendVerificationMail(payload);
        console.log("Done sending ")        
    } catch (error) {
        logger.error(error.message)
    }

})


eventDispatch.on("auth:user-requested-verification-token", async function (payload:UserRequestVerificationEventPayload) {
    try{
        console.log("Sending verification token to mail")
        await sendVerificationMail(payload);
        console.log("Done seindg verification token");

    } catch (error) {
        logger.error(error.message)
    }
})