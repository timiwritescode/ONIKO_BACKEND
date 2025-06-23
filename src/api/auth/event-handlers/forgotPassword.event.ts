import { sendPasswordResetTokenMail, sendVerificationMail } from "../../../email/email.service";
import { ForgotPasswordEventPayload } from "../events/forgot-password.events";
import { eventDispatch } from "../../../events/eventDispatcher.util";
import { UserRegisteredEventPayload } from "../events/user-registed.event";

eventDispatch.on("auth:forgot-password-requested", async function (payload: ForgotPasswordEventPayload)  {
    console.log("Sending password reset token");
    await sendPasswordResetTokenMail(payload);
    console.log("Done sending password reset token")
})


eventDispatch.on("auth:user-registered", async function(payload: UserRegisteredEventPayload) {
    console.log("Sending verification password");
    await sendVerificationMail(payload);
    console.log("Done sending ")
})