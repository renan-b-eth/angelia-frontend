// angelia-frontend/pages/admin/_middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const auth = basicAuth.split(' ')[1];
    // As credenciais devem ser guardadas em variáveis de ambiente em produção!
    const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':');

    if (user === 'admin' && pwd === 'senha_segura') { // <-- MUDE ISSO EM PRODUÇÃO
      return NextResponse.next();
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}