// INSFRAESTRUCTURE: aca se hace la implementacion de las reglas del domain/datasources

import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from 'fs';


export class FileSystemDatasource implements LogDatasource { // implementa la clase con las reglas


    private readonly logPath = 'logs/'; // readonly: no se puede modificar el valor 
    private readonly allLogsPath    = 'logs/logs-all.log'; // todos los logs se van a almacenar en este path
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath   = 'logs/logs-high.log';


    constructor() {
        this.createLogsFiles(); // para que no sea necesario llamar al método y que la clase no quede sin inicializar
    }


    private createLogsFiles = () => { // se crea la instancia

        if ( !fs.existsSync( this.logPath )) { // si no existe el archivo

            fs.mkdirSync( this.logPath ); // crea el archivo
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,

        ].forEach( path => {
            if ( fs.existsSync( path )) return // si existe no hace nd 

            fs.writeFileSync( path, '' ); // si no existe se crea
        })
    }



    //IMPLEMENTACION GRABAR UN LOG
    async saveLog( newLog: LogEntity): Promise<void> {

        const logAsJson = `${ JSON.stringify(newLog) }\n`;

        fs.appendFileSync( this.allLogsPath, logAsJson ); // agrega los logs al archivo path, y lo pasa a JSON
    
        if (newLog.level === LogSeverityLevel.low) return; 

        if (newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync( this.mediumLogsPath, logAsJson );
        }else {
            fs.appendFileSync( this.highLogsPath, logAsJson );
        }

    }


    private getLogsFromFile = ( path: string ): LogEntity[] => { // ruta de archivo como argumento y devuelve un arreglo de instancias de LogEntity que representan los registros almacenados en ese archivo.

        const content = fs.readFileSync( path, 'utf-8'); // lee el contenido del archivo

        if (content === '') return []; // si no hay contenido que devuelva un array vacio
        const logs = content.split('\n').map( // divide el contenido en líneas 
            log => LogEntity.fromJson(log) // mapea cada línea a una instancia de LogEntity
        );
        
        return logs;
    }

    // IMPLEMENTACION OBTENER LOGS
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> { 

        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath)

            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath)

            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath)

            default:
                throw new Error( `${severityLevel} not implemnted`); 
        }
    }

}