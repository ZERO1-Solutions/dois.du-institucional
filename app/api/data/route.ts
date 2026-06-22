import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'content', 'data.json');

// Helper to check auth
function isAuthenticated(request: Request) {
  const cookie = request.headers.get('cookie');
  return cookie?.includes('admin_session=true');
}

export async function GET() {
  const data = await fs.readFile(DATA_PATH, 'utf-8');
  return NextResponse.json(JSON.parse(data));
}

export async function PUT(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, message: 'Não autorizado' }, { status: 401 });
  }

  try {
    const newData = await request.json();
    await fs.writeFile(DATA_PATH, JSON.stringify(newData, null, 2), 'utf-8');
    return NextResponse.json({ success: true, data: newData });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Erro ao salvar dados' }, { status: 500 });
  }
}