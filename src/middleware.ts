import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const { data: { session } } = await supabase.auth.getSession()

  const protectedRoutes = ['/track', '/pricing', '/optimize-route'];
  const { pathname } = req.nextUrl;

  if (!session && protectedRoutes.includes(pathname)) {
    const url = new URL(req.url);
    url.pathname = '/login';
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

    