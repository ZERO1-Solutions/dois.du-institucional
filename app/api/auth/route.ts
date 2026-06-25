import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { username, password } = await request.json();
  
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-prod';

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Create JWT token
    const token = jwt.sign(
      { username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    // Set JWT in httpOnly cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_token', token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 2, // 2 hours
      path: '/',
      sameSite: 'strict'
    });
    return response;
  }

  return NextResponse.json({ success: false, message: 'Credenciais inválidas' }, { status: 401 });
}

// Logout route
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('admin_token', '', { 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1,
    path: '/'
  });
  return response;
}
