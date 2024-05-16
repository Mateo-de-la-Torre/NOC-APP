import { LogEntity } from "../src/domain/entities/log.entity";
import { CheckService } from "../src/domain/use.cases/checks/check-service";

describe('check-service.test.ts', () => {

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    
    const checkService = new CheckService(
        mockRepository,
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
        
        expect(mockRepository.saveLog).toBeCalledWith( expect.any( LogEntity ));
    });

    it('should call errorCallback when fetch return false', async() => {


        const wasOk = await checkService.execute('https://goaasssdscascscogle.com');

        expect(wasOk).toBe(false);
        expect(errorCallback).toHaveBeenCalled();
        expect(successCallback).not.toHaveBeenCalled();
        
        expect(mockRepository.saveLog).toBeCalledWith( expect.any( LogEntity ));
    });
});