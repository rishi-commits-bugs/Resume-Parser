import { API_BASE_URL, API_ROUTES, handleApiResponse, DEFAULT_HEADERS } from './apiConfig';

export interface ParsedResume {
  name: string;
  email: string;
  phone: string;
  summary: string;
  skills: string[];
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    graduation: string;
  }>;
}

export interface ComparisonResult {
  match_score: string;
  matching_skills: string[];
  missing_skills: string[];
  recommendations: string[];
}

export interface SpellCheckResult {
  errors?: Array<{
    error_text: string;
    suggestion: string;
    explanation: string;
  }>;
  summary?: {
    total_errors: number;
    severity: string;
    improvement_recommendation: string;
  };
}

function logApiRequest(endpoint: string, method: string, data: any): void {
  console.log(`API Request: ${method} ${endpoint}`);
  console.log('Request data:', data);
}

function isClientBlockedError(error: any): boolean {
  return error.message?.includes('ERR_BLOCKED_BY_CLIENT') || 
         error.message?.includes('Failed to fetch') ||
         error.message?.includes('NetworkError');
}

export async function parseResume(
  resumeFile: File,
  includeSummary: boolean = true
): Promise<ParsedResume> {
  const formData = new FormData();
  formData.append('resume_file', resumeFile);
  formData.append('include_summary', includeSummary.toString());

  const endpoint = `${API_BASE_URL}${API_ROUTES.PARSE_RESUME}`;
  logApiRequest(endpoint, 'POST', { file: resumeFile.name, includeSummary });

  try {
    console.log(`Making request to: ${endpoint}`);
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    console.log('Response status:', response.status);
    return handleApiResponse(response);
  } catch (error: any) {
    console.error('Network error when calling parseResume:', error);
    console.log('API endpoint attempted:', endpoint);
    
    if (isClientBlockedError(error)) {
      throw new Error(
        'Request blocked by browser. This might be due to:\n' +
        '1. An ad blocker or security extension blocking the request\n' +
        '2. Browser security settings\n' +
        '3. Network firewall settings\n\n' +
        'Please try:\n' +
        '1. Temporarily disabling ad blockers\n' +
        '2. Using a different browser\n' +
        '3. Checking your network settings'
      );
    }
    
    throw error;
  }
}

export async function compareResumeToJob(
  resumeFile: File,
  jobDescription: string
): Promise<ComparisonResult> {
  const formData = new FormData();
  formData.append('resume_file', resumeFile);
  formData.append('job_description', jobDescription);

  const endpoint = `${API_BASE_URL}${API_ROUTES.COMPARE_RESUME_TO_JOB}`;
  logApiRequest(endpoint, 'POST', { file: resumeFile.name });

  try {
    console.log(`Making request to: ${endpoint}`);
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    console.log('Response status:', response.status);
    return handleApiResponse(response);
  } catch (error: any) {
    console.error('Network error when calling compareResumeToJob:', error);
    console.log('API endpoint attempted:', endpoint);
    
    if (isClientBlockedError(error)) {
      throw new Error(
        'Request blocked by browser. This might be due to:\n' +
        '1. An ad blocker or security extension blocking the request\n' +
        '2. Browser security settings\n' +
        '3. Network firewall settings\n\n' +
        'Please try:\n' +
        '1. Temporarily disabling ad blockers\n' +
        '2. Using a different browser\n' +
        '3. Checking your network settings'
      );
    }
    
    throw error;
  }
}

export async function spellCheckResume(
  resumeFile: File
): Promise<SpellCheckResult> {
  const formData = new FormData();
  formData.append('resume_file', resumeFile);

  const endpoint = `${API_BASE_URL}${API_ROUTES.SPELL_CHECK_RESUME}`;
  logApiRequest(endpoint, 'POST', { file: resumeFile.name });

  try {
    console.log(`Making request to: ${endpoint}`);
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    console.log('Response status:', response.status);
    return handleApiResponse(response);
  } catch (error: any) {
    console.error('Network error when calling spellCheckResume:', error);
    console.log('API endpoint attempted:', endpoint);
    
    if (isClientBlockedError(error)) {
      throw new Error(
        'Request blocked by browser. This might be due to:\n' +
        '1. An ad blocker or security extension blocking the request\n' +
        '2. Browser security settings\n' +
        '3. Network firewall settings\n\n' +
        'Please try:\n' +
        '1. Temporarily disabling ad blockers\n' +
        '2. Using a different browser\n' +
        '3. Checking your network settings'
      );
    }
    
    throw error;
  }
} 