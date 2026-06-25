import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { LRUCache } from 'lru-cache';

// Configure rate limiter
const rateLimiter = new LRUCache<string, number>({
  max: 100,
  ttl: 15 * 60 * 1000, // 15 minutes
});

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// WhatsApp/phone validation regex (basic)
const PHONE_REGEX = /^[\d\s\-+()]+$/;

export async function POST(request: Request) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const currentRequests = (rateLimiter.get(ip) || 0) + 1;
  rateLimiter.set(ip, currentRequests);

  if (currentRequests > 5) {
    return NextResponse.json(
      { success: false, message: 'Muitas requisições. Tente novamente mais tarde.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Preencha todos os campos obrigatórios.' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Email inválido.' },
        { status: 400 }
      );
    }

    // Validate phone format if provided
    if (phone && !PHONE_REGEX.test(phone)) {
      return NextResponse.json(
        { success: false, message: 'Número de telefone inválido.' },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.trim().length < 10) {
      return NextResponse.json(
        { success: false, message: 'Mensagem muito curta (mínimo 10 caracteres).' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Nova mensagem de contato de ${name}`,
      text: `
        Nome: ${name}
        Email: ${email}
        Telefone: ${phone || 'Não informado'}
        
        Mensagem:
        ${message}
      `,
      html: `
        <h2>Nova mensagem de contato</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
        <hr>
        <p><strong>Mensagem:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao enviar mensagem. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}
