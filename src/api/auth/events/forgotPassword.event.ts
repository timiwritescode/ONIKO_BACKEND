import { sendPasswordResetTokenMail } from "../../../email/email.service";
import { ForgotPasswordEventPayload } from "../../../events/event-payload-types/forgot-password.events";
import { eventDispatch } from "../../../events/eventDispatcher.util";

eventDispatch.on("auth:forgot-password-requested", async function (payload: ForgotPasswordEventPayload)  {
    console.log("Sending password reset token");
    await sendPasswordResetTokenMail(payload);
    console.log("Done sending password reset token")
})