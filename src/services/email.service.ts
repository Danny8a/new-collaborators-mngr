import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';

export async function sendEmail(to: string, subject: string, body: string) {
    const sesClient = new SESv2Client({
        region: process.env.AWS_REGION ?? 'us-east-2',
        credentials: {
            accessKeyId: process.env.AWS_SES_ACCESS_KEY!,
            secretAccessKey: process.env.AWS_SES_SECRET_KEY!,
        },
    });

    const params = {
        Destination: {
            ToAddresses: [to],
        },
        Content: {
            Simple: {
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: body,
                    },
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: subject,
                },
            },
        },
        FromEmailAddress: 'dannyochoa58@outlook.com',
    };
    const command = new SendEmailCommand(params);
    return await sesClient.send(command);
}
