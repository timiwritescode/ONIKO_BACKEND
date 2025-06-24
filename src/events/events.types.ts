import { ForgotPasswordEventPayload } from "../api/auth/events/forgot-password.events";
import {UserRequestVerificationEventPayload} from "../api/auth/events/user-registed.event"


export interface CustomAppEvents {
    "auth:forgot-password-requested": ForgotPasswordEventPayload;
    "auth:user-registered": UserRequestVerificationEventPayload;
    "auth:user-requested-verification-token": UserRequestVerificationEventPayload;
}