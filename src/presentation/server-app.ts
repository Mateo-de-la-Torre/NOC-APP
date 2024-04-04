import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use.cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use.cases/checks/check-service-multiple";
import { SendLogEmail } from "../domain/use.cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasourse";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgreLogDatasource } from "../infrastructure/datasources/postgre-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.services";



// INSTANCIAS
const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
)
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
)
const postgreLogRepository = new LogRepositoryImpl(
    new PostgreLogDatasource(),
)

const emailService = new EmailService();



export class ServerApp { // Logica del servidor

    public static async start() { // metodo estatico para no inicializar la clase

        console.log('Server running...');


        // todo: MANDAR EMAIL
        // new SendLogEmail(
        //     emailService,                //Dependencia
        //     logRepository,     // Dependencia
        // )
        // .execute(
        //     ['mateo.delatorre@gmail.com', 'delatorremateo@hotmail.com']
        // )


        // const logs = await logRepository.getLogs(LogSeverityLevel.medium);
        // console.log(logs);
        


        // todo: MONITOREO DE LA URL INDIVIDUAL
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com';

                new CheckServiceMultiple(
                    
                    [ fsLogRepository, mongoLogRepository, postgreLogRepository ],
                    () => console.log(`${url} is ok`), // Callback de éxito: imprime un mensaje de que la URL está bien
                    ( error ) => console.log( error ), // Callback de error: imprime el error en la consola
                    
                ).execute( url );
            }
        )
        

    }
}