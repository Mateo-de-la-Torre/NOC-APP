import { LogModel } from "../../data/mongos";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";



export class MongoLogDatasource implements LogDatasource {

    async saveLog(newLog: LogEntity): Promise<void> {
        
        const log = await LogModel.create(newLog);
        // await log.save();
        console.log('Mongo Log created: ', log.id );
        
    }
    
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        const logs = await LogModel.find({ // busca los documentos de log en la DB que coincidan con el nivel de gravedad 
            level: severityLevel
        });

        return logs.map( mongoLog => LogEntity.fromObject(mongoLog)); // convertir los documentos de log recuperados de la base de datos en instancias de LogEntity
    }

}