import { LogEntity } from "../src/domain/entities/log.entity";
import { SendLogEmail } from "../src/domain/use.cases/email/send-email-logs";
import { EmailService } from "../src/presentation/email/email.services";

describe('send-email-logs.test.ts', () => {

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };
    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }

    const sendLogEmail = new SendLogEmail(
        mockEmailService as any,
        mockRepository,
    );

    beforeEach(() => {
        jest.clearAllMocks();
    })
    
    it('should call sendEmail and saveLog', async() => {
        
        const result = await sendLogEmail.execute('mateo.delatorre@gmail.com');

        expect(result).toBe(true);
        expect( mockEmailService.sendEmailWithFileSystemLogs ).toBeCalledTimes(1); 
        
        expect(mockRepository.saveLog).toBeCalledWith( expect.any( LogEntity ));
        expect(mockRepository.saveLog).toBeCalledWith({
            createdAt: expect.any(Date),
            level: "low",
            message: "Log email sent",
            origin: "send-email-logs.ts",
        });
    });


    it('should error sendEmail and saveLog', async() => {

        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue( false ); // obligamos a q retorne falso
 
        const result = await sendLogEmail.execute('mateo.delatorre@gmail.com');

        expect(result).toBe(false);
        expect( mockEmailService.sendEmailWithFileSystemLogs ).toBeCalledTimes(1); 
        
        expect(mockRepository.saveLog).toBeCalledWith( expect.any( LogEntity ));
        expect(mockRepository.saveLog).toBeCalledWith({
            createdAt: expect.any(Date),
            level: "high",
            message: "Error: Email log not sent",
            origin: "send-email-logs.ts",
        });
    });
});