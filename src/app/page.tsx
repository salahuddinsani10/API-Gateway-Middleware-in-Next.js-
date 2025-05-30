'use client';

import { useState } from 'react';

export default function Home() {
  const [result, setResult] = useState<{ status: number; data: Record<string, unknown> } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSecureData = async (withToken = true) => {
    setLoading(true);
    setError(null);
    try {
      const headers: HeadersInit = withToken 
        ? { 'Authorization': 'Bearer vercel-lab-token' }
        : {};
      
      const response = await fetch('/api/secure-data', { headers });
      const data = await response.json();
      
      setResult({
        status: response.status,
        data: data
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24">
      <h1 className="text-4xl font-bold mb-6">API Gateway & Middleware Demo</h1>
      
      <div className="w-full max-w-3xl bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">About This Project</h2>
        <p className="mb-4">
          This Next.js application demonstrates how to implement an API Gateway pattern with middleware for authentication.
          The secure endpoint at <code className="bg-gray-100 dark:bg-zinc-700 px-2 py-1 rounded">/api/secure-data</code> is protected by a middleware that checks for a valid authorization token.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md">
          <h3 className="text-lg font-medium mb-2">How It Works</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Middleware intercepts requests to <code className="bg-gray-100 dark:bg-zinc-700 px-2 py-1 rounded">/api/secure-data</code></li>
            <li>It checks for the presence of a valid authorization token</li>
            <li>If valid, the request proceeds to the API route</li>
            <li>If invalid, a 401 Unauthorized response is returned</li>
          </ol>
        </div>
      </div>

      <div className="w-full max-w-3xl bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Test the API</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <button
            onClick={() => fetchSecureData(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Test With Valid Token'}
          </button>
          <button
            onClick={() => fetchSecureData(false)}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Test Without Token'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-md mb-4">
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-gray-50 dark:bg-zinc-700/50 p-4 rounded-md overflow-auto">
            <div className="flex items-center mb-2">
              <span className="font-medium mr-2">Status:</span>
              <span className={`px-2 py-1 rounded text-sm ${result.status === 200 ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}>
                {result.status} {result.status === 200 ? 'OK' : 'Unauthorized'}
              </span>
            </div>
            <div>
              <span className="font-medium">Response:</span>
              <pre className="bg-gray-100 dark:bg-zinc-800 p-3 rounded-md mt-2 overflow-auto">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="w-full max-w-3xl bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">API Usage with curl</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">With Valid Token</h3>
            <pre className="bg-gray-100 dark:bg-zinc-800 p-3 rounded-md overflow-auto">
              curl -H &quot;Authorization: Bearer vercel-lab-token&quot; https://your-deployed-url.vercel.app/api/secure-data
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Without Token</h3>
            <pre className="bg-gray-100 dark:bg-zinc-800 p-3 rounded-md overflow-auto">
              curl https://your-deployed-url.vercel.app/api/secure-data
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
