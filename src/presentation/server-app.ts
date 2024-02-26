import { CheckService } from "../domain/use.cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasourse";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";



// INSTANCIAS
const fileSistemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)



export class ServerApp { // Logica del servidor

    public static start() { // metodo estatico para no inicializar la clase

        console.log('Server running...');

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com';

                new CheckService(
                    
                    fileSistemLogRepository,
                    () => console.log(`${url} is ok`), // Callback de éxito: imprime un mensaje de que la URL está bien
                    ( error ) => console.log( error ), // Callback de error: imprime el error en la consola
                    
                ).execute( url );
                
                // new CheckService().execute( 'http://localhost:3000' );
            }
        )
    }
}