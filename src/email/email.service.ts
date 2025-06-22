import Mail from "nodemailer/lib/mailer";
import { ENV } from "../config/env.config";
import { ForgotPasswordEventPayload } from "../events/event-payload-types/forgot-password.events";
import nodemailer from "nodemailer"
import SMTPPool from "nodemailer/lib/smtp-pool";

export async function sendPasswordResetTokenMail(payload: ForgotPasswordEventPayload) {
    const subject = "Password reset token";
    const recipient = payload.email;
    const message = "Here is your password reset token: " + payload.token;

    await sendMail(message, recipient, subject)
}


async function sendMail(message: string, recipient: string, subject: string) {
    const transportOptions: SMTPPool.Options = {
        host: ENV.MAIL_HOST,
        port: +ENV.MAIL_PORT,
        pool: true,
        auth: {
            user: ENV.ORG_MAIL,
            pass: ENV.MAIL_PASSWORD
        }
    }
    const transporter = nodemailer.createTransport(transportOptions)

    const mailOptions: Mail.Options = {
        from: ENV.ORG_MAIL,
        to: recipient,
        subject,
        html: message
    }

    await transporter.sendMail(mailOptions);
}