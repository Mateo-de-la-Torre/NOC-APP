import { LogEntity, LogSeverityLevel } from "../src/domain/entities/log.entity";
import {  LogRepositoryImpl } from "../src/infrastructure/repositories/log.repository.impl";

describe('log.repository.impl.test.ts', () => {

    const mockDatasources = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const logRepository = new LogRepositoryImpl(mockDatasources);

    beforeEach(() => {
        jest.clearAllMocks();
    })


    it('saveLog should call the datasources with arguments', async() => {

        const log = { level: LogSeverityLevel.high, message: 'hola'} as LogEntity;
        await logRepository.saveLog(log);

        expect(mockDatasources.saveLog ).toHaveBeenLastCalledWith(log);
    });


    it('getLogs should call the datasources with arguments', async() => {

        const lowSeverity = LogSeverityLevel.low;

        await logRepository.getLogs( lowSeverity );
        
        expect( mockDatasources.getLogs ).toHaveBeenCalledWith(lowSeverity);
    });
});