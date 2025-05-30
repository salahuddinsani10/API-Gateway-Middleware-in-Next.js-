import { NextResponse } from 'next/server';

export function middleware(request) {
  // Enhanced logging with timestamp and request details
  const timestamp = new Date().toISOString();
  const requestUrl = request.nextUrl.toString();
  const requestMethod = request.method;
  const userAgent = request.headers.get('user-agent') || 'Unknown';
  const clientIp = request.headers.get('x-forwarded-for') || 'Unknown';
  
  console.log(`[${timestamp}] Middleware processing ${requestMethod} request to: ${requestUrl}`);
  console.log(`[${timestamp}] Client details: IP=${clientIp}, UA=${userAgent}`);
  
  const token = request.headers.get("authorization");
  
  // Log the authorization attempt with more details
  console.log(`[${timestamp}] Authorization attempt: Token ${token ? 'Present' : 'Missing'}`);
  
  if (!token || token !== "Bearer vercel-lab-token") {
    console.log(`[${timestamp}] UNAUTHORIZED: Invalid or missing token for ${requestUrl}`);
    
    // For API requests, return JSON response
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json(
        { message: "Unauthorized", timestamp, path: request.nextUrl.pathname },
        { status: 401 }
      );
    }
    
    // For non-API requests, redirect to error page
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }
  
  // Add the user to the headers for the API route to use
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user', 'authenticated-user');
  requestHeaders.set('x-request-id', crypto.randomUUID()); // Add request ID for tracing
  requestHeaders.set('x-request-timestamp', timestamp);
  
  console.log(`[${timestamp}] AUTHORIZED: Request proceeding to ${request.nextUrl.pathname}`);
  
  // Allow request to continue
  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

export const config = {
  matcher: ['/api/secure-data'],
};
