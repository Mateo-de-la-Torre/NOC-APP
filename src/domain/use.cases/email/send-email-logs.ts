import { EmailService } from "../../../presentation/email/email.services"
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repositoty"


interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean> // Método execute que toma un parámetro 'to' y devuelve una promesa booleana
};


// Clase que implementa el caso de uso de enviar registros por correo electrónico
export class SendLogEmail implements SendLogEmailUseCase {

    constructor( // Constructor que recibe como dependencias:
        private readonly emailService: EmailService,       // el servicio de correo electrónico
        private readonly logRepository: LogRepository      // el repositorio de logs 
    ) {}

    async execute (to: string | string[]) {

        try {
            
            // Envía los registros por correo electrónico utilizando el servicio de correo electrónico
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
            
            if( !sent ) {
                throw new Error('Email log not sent');
            }

            // CREA UN LOG INSTANCIANDO LOGENTITY
            const log = new LogEntity({
                message: `Log email sent`,
                level: LogSeverityLevel.low,
                origin: 'send-email-logs.ts',
            });

            this.logRepository.saveLog(log); // GUARDA EL LOG 

            return true;
        } catch (error) {

            const log = new LogEntity({
                message: `${ error }`,
                level: LogSeverityLevel.high,
                origin: 'send-email-logs.ts',
            });

            this.logRepository.saveLog(log);
         
            return false;
        }
    }
    
}