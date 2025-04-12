'use client';

import React, { useState } from 'react';
import { API_BASE_URL, API_ROUTES, testApiConnection } from '../../api';

export default function ApiTestPage() {
  const [testResults, setTestResults] = useState<Array<{endpoint: string, success: boolean, error?: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const testHealth = async () => {
    setIsLoading(true);
    try {
      const result = await testApiConnection();
      setTestResults([{
        endpoint: `${API_BASE_URL}/health`,
        success: result,
        error: result ? undefined : 'Failed to connect to health endpoint'
      }]);
    } catch (error: any) {
      setTestResults([{
        endpoint: `${API_BASE_URL}/health`,
        success: false,
        error: error.message || 'Unknown error'
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const testAllEndpoints = async () => {
    setIsLoading(true);
    const results = [];
    
    try {
      const healthResult = await fetch(`${API_BASE_URL}/health`).catch(e => null);
      results.push({
        endpoint: `${API_BASE_URL}/health`,
        success: healthResult !== null && healthResult.ok,
        error: healthResult?.ok ? undefined : 'Failed to connect'
      });
      
      for (const [name, path] of Object.entries(API_ROUTES)) {
        const endpoint = `${API_BASE_URL}${path}`;
        try {
          const response = await fetch(endpoint, { method: 'OPTIONS' }).catch(e => null);
          results.push({
            endpoint,
            success: response !== null,
            error: response ? undefined : 'CORS or network error'
          });
        } catch (error: any) {
          results.push({
            endpoint,
            success: false,
            error: error.message || 'Unknown error'
          });
        }
      }
      
      setTestResults(results);
    } catch (error: any) {
      console.error("Error during API testing:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">API Connection Test</h1>
      
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">API Configuration</h2>
        <p><strong>Base URL:</strong> {API_BASE_URL}</p>
        <div className="mt-4 space-x-4">
          <button 
            onClick={testHealth}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Test Health Endpoint
          </button>
          <button 
            onClick={testAllEndpoints}
            disabled={isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            Test All Endpoints
          </button>
        </div>
      </div>
      
      {isLoading && (
        <div className="text-center py-4">
          <p>Testing API endpoints...</p>
        </div>
      )}
      
      {testResults.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Test Results</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Endpoint</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Error</th>
              </tr>
            </thead>
            <tbody>
              {testResults.map((result, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-2">{result.endpoint}</td>
                  <td className="p-2">
                    {result.success ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Success</span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Failed</span>
                    )}
                  </td>
                  <td className="p-2 text-red-600">{result.error || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Troubleshooting Steps</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Make sure the backend server is running on {API_BASE_URL}</li>
          <li>Check that CORS is properly configured on the backend</li>
          <li>Verify network connectivity between frontend and backend</li>
          <li>Check browser console for detailed error messages</li>
          <li>Try accessing the API directly from browser to verify it's running</li>
        </ul>
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Network Information</h2>
        <pre className="bg-gray-800 text-white p-3 rounded overflow-auto">
          {`User Agent: ${typeof navigator !== 'undefined' ? navigator.userAgent : 'Not available'}\n`}
          {`Origin: ${typeof window !== 'undefined' ? window.location.origin : 'Not available'}\n`}
          {`API Base URL: ${API_BASE_URL}`}
        </pre>
      </div>
    </div>
  );
} 