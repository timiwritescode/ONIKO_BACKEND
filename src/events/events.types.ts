import { ForgotPasswordEventPayload } from "../api/auth/events/forgot-password.events";
import {UserRegisteredEventPayload} from "../api/auth/events/user-registed.event"


export interface CustomAppEvents {
    "auth:forgot-password-requested": ForgotPasswordEventPayload;
    "auth:user-registered": UserRegisteredEventPayload;
}