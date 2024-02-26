
// DATASOURCES: contiene los origenes de datos
// Llegamos al dataSources mediante el repository
// En esta carpeta solo son las reglas, aca no se hace la implementacion 


import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

// es como un contrato todos los datasources tienen q cumplirlo

// con esta clase abstracta sirve para poner las reglas de negocio y como queremos q funcione

export abstract class LogDatasource { // abstract, para que no se pueden crear instancias de la clase

    abstract saveLog( newLog: LogEntity ): Promise<void>; // Método para guardar un log, que debe ser implementado por las clases hijas
    abstract getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]>;
}