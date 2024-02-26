import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repositoty";


// PARA PODER CAMBIAR FACILMENTE CUALQUIER DATASOURCES
export class LogRepositoryImpl implements LogRepository { // implementa la clase abstracta

    constructor(
        private readonly logDatasource: LogDatasource // esto es lo mismo que recibirlo como argumento e inicializarlo
    ) {}


    async saveLog(log: LogEntity): Promise<void> {
        return this.logDatasource.saveLog( log );
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs( severityLevel );
    }
}

// La clase LogRepositoryImpl es como un intermediario entre nuestra aplicación y la forma en que almacenamos y recuperamos los registros (logs),

// simplemente llamamos al método y La clase LogRepositoryImpl se encarga.

// Esta separación de responsabilidades es una práctica común en el diseño de arquitecturas limpias y facilita la modularidad y el mantenimiento del código.





