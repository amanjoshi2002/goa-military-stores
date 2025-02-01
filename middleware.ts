import { NextResponse } from 'next/server';
import { getCookie } from 'cookies-next';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = getCookie('isLoggedIn', { req: request });

  if (request.nextUrl.pathname.startsWith('/admin') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
} 