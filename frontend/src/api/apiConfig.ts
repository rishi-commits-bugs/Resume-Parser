const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
export const API_BASE_URL = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;

export const API_VERSION = 'v1';

export const API_ROUTES = {
  PARSE_RESUME: `/api/${API_VERSION}/parse-resume`,
  COMPARE_RESUME_TO_JOB: `/api/${API_VERSION}/compare-resume-to-job`,
  SPELL_CHECK_RESUME: `/api/${API_VERSION}/spell-check-resume`,
  HEALTH: '/health',
} as const;

export const DEFAULT_HEADERS = {
  'Accept': 'application/json',
  'Cache-Control': 'no-cache',
};

export class ApiError extends Error {
  public status: number;
  public data: any;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export function isClientBlockedError(error: any): boolean {
  return error.message?.includes('ERR_BLOCKED_BY_CLIENT') || 
         error.message?.includes('Failed to fetch') ||
         error.message?.includes('NetworkError');
}


export function getClientBlockedErrorMessage(): string {
  return `Request blocked by browser. This might be due to:
1. An ad blocker or security extension blocking the request
2. Browser security settings
3. Network firewall settings

Please try:
1. Temporarily disabling ad blockers
2. Using a different browser
3. Checking your network settings
4. Using an incognito/private window`;
}

export async function handleApiResponse(response: Response): Promise<any> {
  try {
    const data = await response.json();
    
    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.message || `HTTP error! status: ${response.status}`
      );
    }
    
    return data;
  } catch (error) {
    throw error;
  }
}

export async function testApiConnection(): Promise<boolean> {
  const endpoint = `${API_BASE_URL}${API_ROUTES.HEALTH}`;
  
  try {
    console.log('Making health check request...');
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: DEFAULT_HEADERS,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
    });
    
    console.log('Health check response status:', response.status);
    const data = await response.json();
    console.log('Health check response:', data);
    
    return response.ok;
  } catch (error: any) {
    console.error('API connection test failed:', error);
    
    if (isClientBlockedError(error)) {
      console.error('\nClient blocking detected. Please check:');
      console.error('1. Ad blockers or security extensions');
      console.error('2. Browser security settings');
      console.error('3. Network firewall settings');
      console.error('\nTry using an incognito/private window or a different browser.');
    }
    
    return false;
  }
} 