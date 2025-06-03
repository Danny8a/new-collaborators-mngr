import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';
import {sendEmail} from "../../services/email.service";

jest.mock('@aws-sdk/client-sesv2');

describe('sendEmail', () => {
    const mockSend = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        (SESv2Client as jest.Mock).mockImplementation(() => ({
            send: mockSend,
        }));
    });

    it('should send an email with the given subject and recipient', async () => {
        const fakeResponse = { MessageId: 'test-message-id' };
        mockSend.mockResolvedValue(fakeResponse);

        const to = 'recipient@example.com';
        const subject = '<p>Hola, este es el cuerpo</p>';

        const result = await sendEmail(to, subject, 'Cuerpo del mensaje de prueba');

        expect(mockSend).toHaveBeenCalledTimes(1);
        expect(mockSend).toHaveBeenCalledWith(expect.any(SendEmailCommand));

        expect(result).toEqual(fakeResponse);
    });
});
