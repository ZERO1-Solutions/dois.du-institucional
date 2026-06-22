import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  console.log('Contact form API called!');
  try {
    const body = await request.json();
    console.log('Received form data:', body);
    const { name, email, company, service, message } = body;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check environment variables
    if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.ADMIN_EMAIL) {
      console.error('Missing SMTP environment variables');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, // This helps with some SMTP providers
      },
    });

    // Verify transporter
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('SMTP connection verified successfully!');

    // HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nova Mensagem - dois.du</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            background-color: #2F5233;
            padding: 30px;
            text-align: center;
          }
          .header img {
            max-height: 80px;
          }
          .content {
            padding: 30px;
          }
          .content h1 {
            color: #2F5233;
            font-size: 24px;
            margin-top: 0;
          }
          .field {
            margin-bottom: 16px;
          }
          .field-label {
            font-weight: bold;
            color: #F46A2C;
            display: block;
            margin-bottom: 4px;
          }
          .field-value {
            color: #333333;
            padding: 8px 12px;
            background-color: #f9f9f9;
            border-radius: 8px;
          }
          .footer {
            background-color: #f0f0f0;
            padding: 20px;
            text-align: center;
            color: #666666;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1 style="color: white; margin:0; font-size: 32px;">dois.du</h1>
          </div>
          <div class="content">
            <h1>Nova mensagem de contato!</h1>
            <div class="field">
              <span class="field-label">Nome:</span>
              <span class="field-value">${name}</span>
            </div>
            <div class="field">
              <span class="field-label">E-mail:</span>
              <span class="field-value">${email}</span>
            </div>
            <div class="field">
              <span class="field-label">Empresa:</span>
              <span class="field-value">${company || 'Não informado'}</span>
            </div>
            <div class="field">
              <span class="field-label">Serviço desejado:</span>
              <span class="field-value">${service}</span>
            </div>
            <div class="field">
              <span class="field-label">Mensagem:</span>
              <div class="field-value">${message}</div>
            </div>
          </div>
          <div class="footer">
            Esta mensagem foi enviada através do site dois.du
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email
    console.log('Attempting to send email...');
    const info = await transporter.sendMail({
      from: `"dois.du - Contato" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `Nova mensagem de ${name} - dois.du`,
      html: htmlContent,
      text: `
        Nova mensagem de contato!
        
        Nome: ${name}
        E-mail: ${email}
        Empresa: ${company || 'Não informado'}
        Serviço desejado: ${service}
        Mensagem: ${message}
      `,
    });

    console.log('Email sent successfully! Message ID:', info.messageId);

    return NextResponse.json({ success: true, messageId: info.messageId }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
