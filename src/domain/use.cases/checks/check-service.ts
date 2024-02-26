import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repositoty";

interface CheckServiceUseCase {
    execute( url: string ): Promise<boolean>; // el metodo recibe el url y espera una promesa boolean
}


type SuccessCallback = (() => void) | undefined; // Define un tipo para el callback de éxito, que no toma argumentos y no devuelve nada
type ErrorCallback   = ((error: string) => void) | undefined; // Define un tipo para el callback de error, que toma un argumento de tipo string (el error) y no devuelve nada


export class CheckService implements CheckServiceUseCase {

    constructor( // inyeccion de dependencias
        private readonly logRepository: LogRepository, // inyectamos el rtepository como dependencia 
        private readonly successCallback: SuccessCallback, // Parámetro para el callback de éxito
        private readonly errorCallback: ErrorCallback, // Parámetro para el callback de error

    ) {}

    public async execute( url: string ): Promise<boolean> { // Si la verificación del servicio es exitosa, la promesa se resuelve con TRUE; si hay algún problema, la promesa se resuelve con FALSE.

        try {
            const req = await fetch(url); // espera la direc url

            if (!req.ok) {
                throw new Error( `Error on check service ${ url }` )
            }

            // Si la solicitud es exitosa
            const log = new LogEntity( `Service ${url} working`, LogSeverityLevel.low ); // hace una instancia de LogEntity, con el menssage y el level 
            this.logRepository.saveLog( log ) // guarda un log 

            this.successCallback && this.successCallback(); // llama al callback de éxito

            return true;

        } catch (error) {

            const errorMessage = `${url} is not ok. Error: ${ error }`;

            const log = new LogEntity( errorMessage , LogSeverityLevel.high );
            this.logRepository.saveLog( log );
            
            this.errorCallback && this.errorCallback( errorMessage ); // Llama al callback de error pasando el mensaje de error
            
            return false;
            
        }

    }
}