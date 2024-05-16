import  fs  from "fs";
import path from "path";
import { FileSystemDatasource } from "../src/infrastructure/datasources/file-system.datasourse";
import { LogEntity, LogSeverityLevel } from "../src/domain/entities/log.entity";

describe('file-system.datasourse.test.ts', () => {

    const logsPath = path.join(__dirname, '../logs'); // encontrar el path a borrar

    beforeEach(() => { // borra la carpeta de logs filesystem antes de todo
        fs.rmSync(logsPath, { recursive: true, force: true})
    })

    it('should create log files if they do not exists', () => {

        new FileSystemDatasource(); // mandamos a llamar y probamos si se crea la carpeta logs

        const files = fs.readdirSync( logsPath );
        
        expect(files).toEqual([ 'logs-all.log', 'logs-high.log', 'logs-medium.log' ]);
    });

    it('should save a log in logs-all.log and logs-medium.log', () => {
    
        const logDatasource = new FileSystemDatasource();

        const log = new LogEntity({
            message: 'test-message',
            level: LogSeverityLevel.medium,
            origin: 'fileSystem.test'
        });

        logDatasource.saveLog(log);
        const allLogs = fs.readFileSync(`${ logsPath}/logs-all.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${ logsPath}/logs-medium.log`, 'utf-8');
                
        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));
    });

    it('should save a log in logs-all.log and logs-high.log', () => {
    
        const logDatasource = new FileSystemDatasource();

        const log = new LogEntity({
            message: 'test-message',
            level: LogSeverityLevel.high,
            origin: 'fileSystem.test'
        });

        logDatasource.saveLog(log);
        const allLogs = fs.readFileSync(`${ logsPath}/logs-all.log`, 'utf-8');
        const hihgLogs = fs.readFileSync(`${ logsPath}/logs-high.log`, 'utf-8');
                
        expect(allLogs).toContain(JSON.stringify(log));
        expect(hihgLogs).toContain(JSON.stringify(log));
    });

    it('should return all logs', async() => {
        
        const logDatasource = new FileSystemDatasource();
        
        const logLow = new LogEntity({
            message: 'test-logLow-message',
            level: LogSeverityLevel.low,
            origin: 'low'
        });

        
        const logMedium = new LogEntity({
            message: 'test-logMedium-message',
            level: LogSeverityLevel.medium,
            origin: 'medium'
        });
        
        const logHigh = new LogEntity({
            message: 'test-logHigh-message',
            level: LogSeverityLevel.high,
            origin: 'high'
        });

        await logDatasource.saveLog( logLow );
        await logDatasource.saveLog( logMedium );
        await logDatasource.saveLog( logHigh );

        const logsLow    = await logDatasource.getLogs( LogSeverityLevel.low );
        const logsMedium = await logDatasource.getLogs( LogSeverityLevel.medium );
        const logsHigh   = await logDatasource.getLogs( LogSeverityLevel.high );     
        

        expect(logsLow).toEqual( expect.arrayContaining([ logLow, logMedium, logHigh ]) );
        expect(logsMedium).toEqual( expect.arrayContaining([ logMedium ]) );
        expect(logsHigh).toEqual( expect.arrayContaining([ logHigh ]) );
    });
});