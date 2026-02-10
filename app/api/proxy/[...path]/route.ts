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
    
    // Get the original Content-Type from the request
    const requestContentType = request.headers.get('content-type');
    
    // For multipart/form-data, do NOT set Content-Type header
    // The browser will set it automatically with the correct boundary
    const isMultipart = requestContentType?.includes('multipart/form-data');
    
    if (!isMultipart) {
      // Only set Content-Type for non-multipart requests
      if (requestContentType) {
        headers['Content-Type'] = requestContentType;
        console.log(`[Proxy] Using original Content-Type: ${requestContentType}`);
      } else {
        headers['Content-Type'] = 'application/json';
      }
    } else {
      console.log('[Proxy] Skipping Content-Type for multipart/form-data (will be set automatically)');
    }

    const options: RequestInit = {
      method,
      headers,
    };

    // Add body for POST, PUT, PATCH
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      // For multipart/form-data, use FormData directly
      if (isMultipart) {
        const formData = await request.formData();
        options.body = formData as any;
        console.log(`[Proxy] Forwarding FormData request`);
      } else {
        const body = await request.text();
        if (body) {
          options.body = body;
          console.log(`[Proxy] Request body:`, body);
        }
      }
    }

    console.log(`[Proxy] Sending request to: ${url}`);
    const response = await fetch(url, options);
    
    console.log(`[Proxy] Response status: ${response.status}`);
    
    // Handle 204 No Content (common for DELETE operations)
    if (response.status === 204) {
      console.log('[Proxy] 204 No Content response');
      return NextResponse.json(
        { 
          success: true, 
          message: 'Operation completed successfully',
          data: null 
        },
        { status: 200 }
      );
    }
    
    const contentType = response.headers.get('content-type');
    
    // Handle empty responses (no content-type or empty body)
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      
      // If the response is successful but has no content, treat it as success
      if (response.ok && (!text || text.trim() === '')) {
        console.log('[Proxy] Empty successful response');
        return NextResponse.json(
          { 
            success: true, 
            message: 'Operation completed successfully',
            data: null 
          },
          { status: 200 }
        );
      }
      
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
    // console.log(`[Proxy] Response data:`, JSON.stringify(data).substring(0, 200));

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