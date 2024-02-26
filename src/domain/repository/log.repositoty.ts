// REPOSITORY: es el que nos va a permitir llamar al DATASOURCES


import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogRepository { // abstract, para que no se pueden crear instancias de la clase

    abstract saveLog( log: LogEntity ): Promise<void>;
    abstract getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]>;
}