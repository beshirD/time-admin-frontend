import { cookies } from 'next/headers';

const BACKEND_URL = 'http://46.202.191.177:8080';

export async function apiServer<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const path = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  const url = `${BACKEND_URL}/${path}`;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const adminUserId = cookieStore.get('userId')?.value;

  const headers = new Headers(options?.headers);
  headers.set('Content-Type', 'application/json');

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  if (adminUserId) {
    headers.set('X-Admin-User-Id', adminUserId);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} ${errorText}`);
  }

  return response.json();
}
