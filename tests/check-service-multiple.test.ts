import { LogEntity } from "../src/domain/entities/log.entity";
import { CheckServiceMultiple } from "../src/domain/use.cases/checks/check-service-multiple";

describe('check-service-multiple.test.ts', () => {

    const mockRepo1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const mockRepo2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const mockRepo3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    
    const checkService = new CheckServiceMultiple(
        [ mockRepo1, mockRepo2, mockRepo3 ],
        successCallback,
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('should call successCallback when fetch return true', async() => {


        const wasOk = await checkService.execute('https://google.com')

        expect(wasOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
        
        expect(mockRepo1.saveLog).toBeCalledWith( expect.any( LogEntity ));
        expect(mockRepo2.saveLog).toBeCalledWith( expect.any( LogEntity ));
        expect(mockRepo3.saveLog).toBeCalledWith( expect.any( LogEntity ));
    });

    it('should call errorCallback when fetch return false', async() => {


        const wasOk = await checkService.execute('https://goaasssdscascscogle.com');

        expect(wasOk).toBe(false);
        expect(errorCallback).toHaveBeenCalled();
        expect(successCallback).not.toHaveBeenCalled();
        
        expect(mockRepo1.saveLog).toBeCalledWith( expect.any( LogEntity ));
        expect(mockRepo2.saveLog).toBeCalledWith( expect.any( LogEntity ));
        expect(mockRepo3.saveLog).toBeCalledWith( expect.any( LogEntity ));
    });
});