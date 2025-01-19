import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for the home page
  // Get all cookies
  console.log('request.url', request.url);
  const cookies = request.cookies;
  // console.log('cookies', cookies);
  if (request.nextUrl.pathname === '/mypage') {
    // Check if the user is logged in
    const isLoggedIn = cookies.has('accessToken');
    // console.log('isLoggedIn:', isLoggedIn);
    if (!isLoggedIn) {
      // Redirect the user to the login page
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith('/reservation/')) {
    {
      // console.log('request.url', request.url);
      if (cookies.has('accessToken') === false) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }

  // Log all cookies
  // console.log('Cookies for home request:', cookies.getAll());
  const response = NextResponse.next();
  return response;
}

// Configure which paths the middleware will run on
export const config = {
  matcher: ['/mypage', '/reservation/:path*'],
};
