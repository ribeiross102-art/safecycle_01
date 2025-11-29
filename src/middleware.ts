import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rotas que requerem autenticação
const protectedRoutes = ['/dashboard', '/devices', '/reports', '/profile', '/checkout'];

// Rotas públicas (não requerem autenticação)
const publicRoutes = ['/login', '/register', '/recovery', '/terms', '/privacy', '/disclaimer'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verificar se é uma rota protegida
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // Obter token do cookie ou header
  const token = request.cookies.get('accessToken')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');

  // Se é rota protegida e não tem token válido
  if (isProtectedRoute) {
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }

    // Token existe, permitir acesso (verificação será feita nas APIs)
    const response = NextResponse.next();
    return response;
  }

  // Se está logado e tenta acessar login/register, permitir (não redirecionar)
  if (isPublicRoute && token && (pathname === '/login' || pathname === '/register')) {
    // Permitir acesso mesmo com token
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|icon.svg).*)',
  ],
};
