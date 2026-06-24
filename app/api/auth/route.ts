import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();
  
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Create a simple cookie session
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', 'true', { 
      httpOnly: false, // Make accessible to JS for frontend check
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/'
    });
    return response;
  }

  return NextResponse.json({ success: false, message: 'Credenciais inválidas' }, { status: 401 });
}