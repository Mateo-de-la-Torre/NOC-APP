import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repositoty";

interface CheckServiceMultipleUseCase {
    execute( url: string ): Promise<boolean>; // el metodo recibe el url y espera una promesa boolean
}


type SuccessCallback = (() => void) | undefined; // Define un tipo para el callback de éxito, que no toma argumentos y no devuelve nada
type ErrorCallback   = ((error: string) => void) | undefined; // Define un tipo para el callback de error, que toma un argumento de tipo string (el error) y no devuelve nada


export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor( // inyeccion de dependencias
        private readonly logRepository: LogRepository[], // para poder grabar los tres simultaneamente 
        private readonly successCallback: SuccessCallback, 
        private readonly errorCallback: ErrorCallback, 

    ) {}

    private callLogs( newLog: LogEntity ) { // para poder mandar a llamar a todos y grabarlos  
        this.logRepository.forEach( logRepository => {
            logRepository.saveLog(newLog)
        })
    }

    public async execute( url: string ): Promise<boolean> { // Si la verificación del servicio es exitosa, la promesa se resuelve con TRUE; si hay algún problema, la promesa se resuelve con FALSE.

        try {
            const req = await fetch(url); // espera la direc url

            if (!req.ok) {
                throw new Error( `Error on check service ${ url }` )
            }

            // Si la solicitud es exitosa

            const log = new LogEntity({ // hace una instancia de LogEntity, con el menssage, el level y el origin
                message: `Service ${url} working`, 
                level  : LogSeverityLevel.low, 
                origin : 'check-service.ts'
            });  

            this.callLogs( log ) // Guarda el log de las tres formas

            this.successCallback && this.successCallback(); // llama al callback de éxito

            return true;

        } catch (error) {

            const errorMessage = `${url} is not ok. Error: ${ error }`;

            const log = new LogEntity({ message: errorMessage , level: LogSeverityLevel.high, origin: 'check-service' });
            
            this.callLogs( log ); // Guarda el log de las tres formas
            
            this.errorCallback && this.errorCallback( errorMessage ); // Llama al callback de error pasando el mensaje de error
            
            return false;
            
        }

    }
}