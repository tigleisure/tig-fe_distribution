import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for the home page
  // Get all cookies
  console.log('url', request.url);
  console.log('pathname', request.nextUrl.pathname);
  const cookies = request.cookies;

  // Log all cookies
  console.log('Cookies for home request:', cookies.getAll());
  const response = NextResponse.next();
  return response;
}

// Configure which paths the middleware will run on
export const config = {};
