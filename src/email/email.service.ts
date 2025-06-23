import Mail from "nodemailer/lib/mailer";
import { ENV } from "../config/env.config";
import { ForgotPasswordEventPayload } from "../api/auth/events/forgot-password.events";
import nodemailer from "nodemailer"
import SMTPPool from "nodemailer/lib/smtp-pool";
import { UserRegisteredEventPayload } from "../api/auth/events/user-registed.event";

export async function sendPasswordResetTokenMail(payload: ForgotPasswordEventPayload) {
    const subject = "Password reset token";
    const recipient = payload.email;
    const message = "Here is your password reset token: " + payload.token;

    await sendMail(message, recipient, subject)
}


export async function sendVerificationMail(payload: UserRegisteredEventPayload)  {
    const subject = "User verification";
    const recipient = payload.email;
    const message = `Welcome to oniko! This is the token to verify you email:  </br> <b>${payload.token}</b> </br> This token expires in 15 minutes`    
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