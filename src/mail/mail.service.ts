import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { PreRegisterDto } from "src/auth/dto/register.dto";

@Injectable()
export class MailService {
    constructor(private readonly mailService: MailerService) {}

    public async sendEmail(user: PreRegisterDto, token: string): Promise<any> {
        const sendingRes = await this.mailService.sendMail({
            from: "no-reply@votre-domaine.com",
            to: user.email,
            subject: "Ton lien de confirmation ✔",
            html:
                "Hello, world! Voici votre token: " +
                token +
                `. Cliquez sur ce lien pour confirmer votre email: ${process.env.CLIENT_URL}/confirmation-email/${token}`,
        });

        if (
            sendingRes.accepted.includes(user.email) &&
            sendingRes.rejected.length === 0
        ) {
            return {
                message: `Email successfully sent to ${user.email} with the token: ${token}`,
            };
        }

        return {
            message:
                "Email successfully sent to " +
                user.email +
                " with the token: " +
                token,
        };
    }
}
