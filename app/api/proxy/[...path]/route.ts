import { NextRequest, NextResponse } from 'next/server';

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
  const url = `${BACKEND_URL}/${path}`;

  console.log(`[Proxy] ${method} ${url}`); // Debug log

  try {
    const headers: Record<string, string> = {};
    
    // Forward relevant headers
    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      headers['Authorization'] = authHeader;
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
        console.log(`[Proxy] Request body:`, body); // Debug log
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
    console.log(`[Proxy] Response data:`, data);

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('[Proxy] Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: { 
          code: 'PROXY_ERROR',
          message: error.message || 'Failed to connect to backend' 
        } 
      },
      { status: 500 }
    );
  }
}