import { ForgotPasswordEventPayload } from "./event-payload-types/forgot-password.events";

export interface CustomAppEvents {
    "auth:forgot-password-requested": ForgotPasswordEventPayload
}