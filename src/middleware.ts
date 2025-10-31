import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - this will refresh the session cookie
  const { data: { session } } = await supabase.auth.getSession()

  const { pathname } = req.nextUrl;

  // If the user is not logged in and is trying to access a protected route,
  // redirect them to the login page.
  if (!session && (pathname === '/dashboard' || pathname === '/track' || pathname === '/pricing' || pathname === '/optimize-route')) {
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
      '/dashboard',
      '/track',
      '/pricing',
      '/optimize-route',
      '/login',
      '/signup'
    ],
  }
