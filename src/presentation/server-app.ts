import { CheckService } from "../domain/use.cases/checks/check-service";
import { CronService } from "./cron/cron-service";



export class ServerApp {

    public static start() {

        console.log('Server running...');

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com';

                new CheckService(
                    () => console.log(`${url} is ok`), // mandamos las funciones de las inyecciones
                    ( error ) => console.log( error ),
                    
                ).execute( url );
                // new CheckService().execute( 'http://localhost:3000' );
            }
        )
    }
}