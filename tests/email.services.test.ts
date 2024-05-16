import nodemailer from "nodemailer";

import { EmailService, SendMailOptions } from "../src/presentation/email/email.services";

describe('email.services.test.ts', () => {


    const mockSendMail = jest.fn();

    // Mock al createTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail, 
    })
    
    const emailService = new EmailService();

    it('should send email', async() => {
        

        const options: SendMailOptions= {
            to: 'mateo@gmail.com',
            subject: 'test',
            htmlBody: '<h1>Test</h1>'
        }
        
        await emailService.sendEmail(options);
        
        expect(mockSendMail).toHaveBeenCalledWith({
            attachments: expect.any(Array),
            html: "<h1>Test</h1>",
            subject: "test",
            to: "mateo@gmail.com",
        });
    });


    it('should send email with attachment ', async() => {
    
        const email = 'mateo@gmail.com';
        await emailService.sendEmailWithFileSystemLogs(email);
    
        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: "Logs del servidor",
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { fileName: 'logs-all.log',    path: './logs/logs-all.log'},
                { fileName: 'logs-medium.log', path: './logs/logs-medium.log'},
                { fileName: 'logs-high.log',   path: './logs/logs-high.log'},   
            ])
        });
    });
});