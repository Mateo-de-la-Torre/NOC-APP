import mongoose from "mongoose";
import { envs } from "../src/config/plugins/envs.plugins";
import { LogModel, MongoDataBase } from "../src/data/mongos/index";
import { MongoLogDatasource } from "../src/infrastructure/datasources/mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../src/domain/entities/log.entity";


describe('mongo-log.datasource.test.ts', () => {

    const logDataSource = new MongoLogDatasource();
    const log = new LogEntity({
        level: LogSeverityLevel.medium,
        message: 'message-test',
        origin: 'mongo-log.datasource.test.ts'
    });
    
    beforeAll(async() => { // conectarce a la DB
        await MongoDataBase.connect({
            mongoUrl: envs.MONGO_URL,
        })
    });
    
    afterEach(async() => { // desdues de cada prueba
        await LogModel.deleteMany(); // borramos todos los logs de prueba
    });

    afterAll(async() => {
        mongoose.connection.close(); // desconectamos la BD
    });


    it('should create a log', async() => {

        const logSpy = jest.spyOn(console, 'log');

        await logDataSource.saveLog(log);

        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("Mongo Log created: ", expect.any(String));
    });

    it('should get logs', async() => {
        
        await logDataSource.saveLog(log);

        const logs = await logDataSource.getLogs( LogSeverityLevel.medium );
    
        expect(logs.length).toBe(1);
        expect(logs[0].level).toBe(LogSeverityLevel.medium);
    });
});