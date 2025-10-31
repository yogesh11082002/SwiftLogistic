import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - this will refresh the session cookie
  await supabase.auth.getSession()

  const { data: { session } } = await supabase.auth.getSession()

  const protectedRoutes = ['/track', '/pricing', '/optimize-route', '/dashboard'];
  const { pathname } = req.nextUrl;

  // If the user is not logged in and is trying to access a protected route,
  // redirect them to the login page.
  if (!session && protectedRoutes.includes(pathname)) {
    const url = new URL(req.url);
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  
  // If the user is logged in and tries to access login or signup,
  // redirect them to the dashboard.
  if (session && (pathname === '/login' || pathname === '/signup')) {
    const url = new URL(req.url);
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return res
}

// Ensure the middleware is only called for relevant paths.
export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       * - auth/callback (Supabase auth callback)
       */
      '/((?!_next/static|_next/image|favicon.ico|auth/callback).*)',
    ],
  }
