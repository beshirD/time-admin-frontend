/**
 * API client for making authenticated requests
 * Works with TanStack Query and uses the /api/proxy route
 */

interface ApiError {
  success: false;
  message: string;
  error?: {
    code: string;
    message: string;
  };
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

class ApiClientError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

/**
 * Base API client function
 * Automatically includes auth headers and handles errors
 */
async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `/api/proxy${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      credentials: 'include', // Include cookies for auth
    });

    const data = await response.json();

    if (!response.ok) {
      const errorData = data as ApiError;
      throw new ApiClientError(
        errorData.message || 'An error occurred',
        response.status,
        errorData.error?.code
      );
    }

    // Return the full response - let the caller decide what to extract
    return data as T;
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }

    // Network or parsing errors
    throw new ApiClientError(
      error instanceof Error ? error.message : 'Network error',
      0
    );
  }
}

/**
 * HTTP method helpers
 */
export const api = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    apiClient<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    apiClient<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    apiClient<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    apiClient<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    apiClient<T>(endpoint, { ...options, method: 'DELETE' }),
};

export { ApiClientError };
export type { ApiResponse, ApiError };
