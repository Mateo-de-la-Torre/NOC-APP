import { LogDatasource } from "../src/domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../src/domain/entities/log.entity";


describe('log.datasource.test.ts', () => {

    const newLog = new LogEntity({ // log de prueba
        origin: 'test',
        message: 'message-test',
        level: LogSeverityLevel.low,
    })

    class MockLogDatasources implements LogDatasource {//clase Mock q implementa la original, porq al ser abtracta no se puede instanciar 

        async saveLog(newLog: LogEntity): Promise<void> {
            return
        }

        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        }
    }

    it('should test the abstract class', async() => {
        
        const mockLogDatasource = new MockLogDatasources(); // instancia de la clase Mock

        expect(mockLogDatasource).toBeInstanceOf( MockLogDatasources ); // Verifica que mockLogDatasource sea una instancia de MockLogDatasources 
        expect(typeof mockLogDatasource.saveLog).toBe( 'function' ); // verifica q el método saveLog sea una funcion
        expect(typeof mockLogDatasource.getLogs).toBe( 'function' ); // verifica q el método getLogs sea una funcion

        // Llama a los metodos de la class
        await mockLogDatasource.saveLog( newLog );
        const logs = await mockLogDatasource.getLogs( LogSeverityLevel.high);
        // console.log(logs);
        

        expect( logs ).toHaveLength(1); // Verifica que el array retornado tenga un solo elemento
        expect( logs[0]).toBeInstanceOf( LogEntity); // verifica q el elemento sea una instancia de LogEntity

    });
});