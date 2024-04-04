import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prisma = new PrismaClient();

// Tabla equivalencias
const severityEnum = { // lo recibo en minuscula y postgres me lo pide en mayusculas
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}


export class PostgreLogDatasource implements LogDatasource {
    
    async saveLog(newLog: LogEntity): Promise<void> {

        const level = severityEnum[newLog.level]; // al no ser compatible con lo que pide postgres ahi q hacer eso

        const log = await prisma.logModel.create({ // Creamos el log para postgres
            data: {
                ...newLog,
                level: level
            }
        });
        console.log('Postgres Log created: ', log.id );
    }


    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        const level = severityEnum[severityLevel];
        const logs = await prisma.logModel.findMany({ 
            where: { 
                level: level
            }
        });

        return logs.map( postgreLog => LogEntity.fromObject(postgreLog))
    }


}   