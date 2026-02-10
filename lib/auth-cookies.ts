/**
 * Helper functions for managing auth tokens in cookies
 * This allows middleware to check authentication status
 */

'use server';

import { cookies } from 'next/headers';

const TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function setAuthCookie(accessToken: string) {
  const cookieStore = await cookies();
  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: TOKEN_MAX_AGE,
    path: '/',
  });
}

export async function setRefreshCookie(refreshToken: string) {
  const cookieStore = await cookies();
  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: TOKEN_MAX_AGE,
    path: '/',
  });
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
}

export async function removeRefreshCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('refreshToken');
}

export async function getAuthCookie() {
  const cookieStore = await cookies();
  return cookieStore.get('accessToken')?.value;
}

export async function getRefreshCookie() {
  const cookieStore = await cookies();
  return cookieStore.get('refreshToken')?.value;
}

