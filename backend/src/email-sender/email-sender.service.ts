import {Injectable} from "@nestjs/common";
import {EmailParams, MailerSend, Recipient, Sender} from "mailersend";

@Injectable()
export class EmailSenderService{
    private mailerSend

    onModuleInit(){
        this.mailerSend = new MailerSend({
            apiKey:process.env.MAIL_API_KEY as string,
        })
    }

    async sendConfirmationEmail(email:string, login:string, confirmationCode:string){
        console.log(email, login, confirmationCode)
        const sentFrom = new Sender("noreply@trial-z3m5jgr33pxgdpyo.mlsender.net", "Verification Bot");

        const recipients = [
            new Recipient(email, login)
        ];

        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setReplyTo(sentFrom)
            .setSubject("Email verification")
            .setHtml(`
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #f9f9f9; padding: 30px; border-radius: 10px; max-width: 600px; margin: auto; border: 1px solid #ddd;">
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
    </div>
  `)
            .setText(`Hello, ${login}!\nYou've got this message because you have to validate your email!\nThis is your confirmation code: ${confirmationCode}`);

        await this.mailerSend.email.send(emailParams);
    }



}