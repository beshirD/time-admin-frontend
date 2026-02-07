import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND_URL = 'http://46.202.191.177:8080';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const params = await context.params;
  return proxyRequest(request, params.path, 'GET');
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const params = await context.params;
  return proxyRequest(request, params.path, 'POST');
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const params = await context.params;
  return proxyRequest(request, params.path, 'PUT');
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const params = await context.params;
  return proxyRequest(request, params.path, 'DELETE');
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const params = await context.params;
  return proxyRequest(request, params.path, 'PATCH');
}

async function proxyRequest(
  request: NextRequest,
  pathSegments: string[],
  method: string
) {
  const path = pathSegments.join('/');
  
  // Get query parameters from the incoming request
  const searchParams = request.nextUrl.searchParams.toString();
  const queryString = searchParams ? `?${searchParams}` : '';
  const url = `${BACKEND_URL}/${path}${queryString}`;

  console.log(`[Proxy] ${method} ${url}`);

  try {
    const headers: Record<string, string> = {};
    
    // Get access token from cookies
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
      console.log('[Proxy] Added Authorization header from cookie');
    } else {
      console.log('[Proxy] No access token found in cookies');
    }
    
    headers['Content-Type'] = 'application/json';

    const options: RequestInit = {
      method,
      headers,
    };

    // Add body for POST, PUT, PATCH
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      const body = await request.text();
      if (body) {
        options.body = body;
        console.log(`[Proxy] Request body:`, body);
      }
    }

    console.log(`[Proxy] Sending request to: ${url}`);
    const response = await fetch(url, options);
    
    console.log(`[Proxy] Response status: ${response.status}`);
    
    const contentType = response.headers.get('content-type');
    
    // Handle non-JSON responses
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error(`[Proxy] Non-JSON response:`, text);
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            code: 'INVALID_RESPONSE',
            message: 'Backend returned non-JSON response' 
          } 
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log(`[Proxy] Response data:`, JSON.stringify(data).substring(0, 200));

    return NextResponse.json(data, { status: response.status });
  } catch (error: unknown) {
    console.error('[Proxy] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to connect to backend';
    return NextResponse.json(
      { 
        success: false, 
        error: { 
          code: 'PROXY_ERROR',
          message: errorMessage
        } 
      },
      { status: 500 }
    );
  }
}