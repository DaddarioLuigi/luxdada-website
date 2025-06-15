import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Allow access to the coming soon page itself
  if (request.nextUrl.pathname === '/coming-soon') {
    return NextResponse.next()
  }

  // Allow access to static files and API routes
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Redirect only the root path to coming soon
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/coming-soon', request.url))
  }

  // Allow access to all other routes
  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
} 