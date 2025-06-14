import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Don't redirect the coming soon page itself
  if (request.nextUrl.pathname === '/coming-soon') {
    return NextResponse.next()
  }

  // Don't redirect static files and API routes
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/static') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Only redirect the home page to coming soon
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/coming-soon', request.url))
  }

  // Allow access to all other routes
  return NextResponse.next()
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
} 