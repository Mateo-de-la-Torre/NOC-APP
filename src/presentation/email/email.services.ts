// PATRON ADAPTADOR

import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugins';


interface SendMailOptions {
    to         : string | string[]; // a quien o a quienes les quiero mandar el correo
    subject    : string; // titulo del correo
    htmlBody   : string; // cuerpo del mail
    attachments?: Attachment[]; // archivo adjunto
}

    interface Attachment {
        fileName: string;
        path    : string;
    }


export class EmailService {// servicio para enviar correos electrónicos

    private transporter = nodemailer.createTransport({ // Crear un objeto transportador para enviar correos electrónicos
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor() {}


    async sendEmail(options: SendMailOptions): Promise<boolean> { // Método para enviar un correo electrónico
        
        const { htmlBody, subject, to, attachments = [] } = options; // por defecto no hay archivo adjunto

        try {
            
            // Enviar el correo electrónico usando el objeto transportador
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            });
            // console.log( sentInformation );

            return true;

        } catch (error) {

            return false;
        }
    }


    async sendEmailWithFileSystemLogs( to: string | string[] ) { // metodo para enviar emails con el sistema de logs como archivo adjunto

        const subject = 'Logs del servidor';
        const htmlBody = `

            <h3>Logs de sistema - NOC </h3>
            <p>Estimado usuario,</p>
            <p>Adjunto encontrarás los registros (logs) del sistema correspondientes a la actividad reciente. Estos registros proporcionan información valiosa sobre el funcionamiento y el estado del sistema, lo que facilita la identificación y resolución de posibles problemas. Por favor, revisa los logs adjuntos para obtener más detalles.</p>
            <p>Atentamente,<br>
                Tu equipo de soporte técnico
            </p>`


        const attachments: Attachment[] = [ // archivo adjunto
            { fileName: 'logs-all.log',    path: './logs/logs-all.log'},
            { fileName: 'logs-medium.log', path: './logs/logs-medium.log'},
            { fileName: 'logs-high.log',   path: './logs/logs-high.log'},   
        ]


        return this.sendEmail({ to, subject, htmlBody, attachments })
    }

}