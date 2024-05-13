import { Injectable } from '@nestjs/common';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

@Injectable()
export class WebhooksService {

    async sendEmail(message: string, name: string, sender: string) {
        const key = process.env.PUBLIC_EMAIL_TOKEN;
        console.log(key);
        const mailerSend = new MailerSend({
            apiKey: key
        })
        console.log("auth")
        console.log(mailerSend);
        const recipients = [new Recipient(`sanchezmendozajoseluis9@gmail.com`, `José Luis`)];
        const sentFrom = new Sender("MS_2upbfz@trial-jpzkmgqy7pyl059v.mlsender.net", "portafolio");
        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setReplyTo(sentFrom)
            .setSubject("Correo desde el portafolio")
            .setHtml(`<div><p>Correo de ${name}: ${message}</p><p>Correo: ${sender}</p></div>`)
            .setText("This is the text content");
        console.log("Email params")
        console.log(emailParams)
        const send = await mailerSend.email.send(emailParams);
        console.log("Enviado")
        console.log(send);
        return send;
    }
}
