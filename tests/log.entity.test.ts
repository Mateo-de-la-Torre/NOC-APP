import { LogEntity, LogSeverityLevel } from "../src/domain/entities/log.entity";


describe('log.entity.test.ts', () => {


    const dataObj = { // log de prueba
        origin: 'test',
        message: 'message-test',
        level: LogSeverityLevel.low,
    }

    it('should create a LogEntity instance', () => {


        const log = new LogEntity(dataObj)

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });


    it('should create a LogEntity instance from json', () => {
        
        const jsonPrueba = `{"message":"Service https://google.com working","level":"low","origin":"check-service.ts","createdAt":"2024-04-09T19:58:15.775Z"}`
        
        const log = LogEntity.fromJson(jsonPrueba);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe("Service https://google.com working");
        expect(log.level).toBe(LogSeverityLevel.low);
        expect(log.origin).toBe("check-service.ts");
        expect(log.createdAt).toBeInstanceOf(Date);
        
    });

    it('should create a LogEntity instance from object', () => {
        
        const log = LogEntity.fromObject(dataObj);
        
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });
});