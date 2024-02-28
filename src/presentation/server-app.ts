import { CheckService } from "../domain/use.cases/checks/check-service";
import { SendLogEmail } from "../domain/use.cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasourse";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.services";



// INSTANCIAS
const fileSistemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)

const emailService = new EmailService();



export class ServerApp { // Logica del servidor

    public static start() { // metodo estatico para no inicializar la clase

        console.log('Server running...');


        // MANDAR EMAIL
        // new SendLogEmail(
        //     emailService,                //Dependencia
        //     fileSistemLogRepository,     // Dependencia
        // )
        // .execute(
        //     ['mateo.delatorre@gmail.com', 'delatorremateo@hotmail.com']
        // )




        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com';

        //         new CheckService(
                    
        //             fileSistemLogRepository,
        //             () => console.log(`${url} is ok`), // Callback de éxito: imprime un mensaje de que la URL está bien
        //             ( error ) => console.log( error ), // Callback de error: imprime el error en la consola
                    
        //         ).execute( url );
                
        //         // new CheckService().execute( 'http://localhost:3000' );
        //     }
        // )
    }
}