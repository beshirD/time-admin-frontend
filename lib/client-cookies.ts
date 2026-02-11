/**
 * Client-side cookie utilities
 * These functions can be used in client components to read cookies
 */

/**
 * Get a cookie value by name (client-side only)
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  
  return null;
}

/**
 * Get the userId from cookie (client-side only)
 */
export function getUserIdFromCookie(): number | null {
  const userId = getCookie('userId');
  console.log('[Client Cookies] Reading userId from cookie:', userId);
  if (typeof document !== 'undefined') {
    console.log('[Client Cookies] All cookies:', document.cookie);
  }
  
  if (!userId) {
    console.warn('[Client Cookies] No userId found in cookie. User may need to log in again.');
    return null;
  }
  
  const parsedId = parseInt(userId, 10);
  console.log('[Client Cookies] Parsed userId:', parsedId);
  return parsedId;
}
