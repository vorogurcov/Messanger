import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class EmailSenderService {
    private transporter;

    onModuleInit() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_GMAIL_ACCOUNT,
                pass: process.env.MAIL_GMAIL_2FA_CODE,
            },
        });
    }

    async sendConfirmationEmail(
        email: string,
        login: string,
        confirmationCode: string,
    ) {
        try {
            const info = await this.transporter.sendMail({
                from: `"Messanger Bot" <${process.env.MAIL_GMAIL_ACCOUNT}>`, // sender address
                to: email, // list of receivers
                subject: 'Email verification', // Subject line
                text: `Hello, ${login}!\nYou've got this message because you have to validate your email!\nThis is your confirmation code: ${confirmationCode}`, // plain text body
                html: `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #f9f9f9; padding: 30px; border-radius: 10px; max-width: 600px; margin: auto; border: 1px solid #ddd;">
      <h2 style="color: #2c3e50; text-align: center;">Email Verification</h2>
      <p>Hello, <strong>${login}</strong>!</p>
      <p>You’ve received this message because you need to verify your email address.</p>
      <p style="margin-top: 20px;">Please use the confirmation code below to complete your verification:</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="display: inline-block; background-color: #4CAF50; color: #fff; padding: 15px 25px; font-size: 20px; font-weight: bold; border-radius: 8px; letter-spacing: 2px;">
          ${confirmationCode}
        </span>
      </div>
      <p>If you did not request this email, you can safely ignore it.</p>
      <hr style="margin: 40px 0; border: none; border-top: 1px solid #ccc;" />
      <p style="font-size: 14px; color: #888;">This is an automated message. Please do not reply.</p>
    </div>`, // html body
            });

            console.log('Message sent: %s', info.messageId);
        } catch (error) {
            console.log('Email was not send due ', error);
        }
    }
}
