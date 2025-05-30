import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-zinc-800 rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 text-red-600 dark:text-red-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-4V7a3 3 0 00-3-3H9a3 3 0 00-3 3v4m9 0h6m-6 0H6" 
              />
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Unauthorized Access</h1>
        
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          You don&apos;t have permission to access this resource. Please provide a valid authorization token.
        </p>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md mb-6 text-left">
          <h2 className="text-lg font-medium mb-2 text-yellow-800 dark:text-yellow-300">How to Access</h2>
          <p className="text-yellow-700 dark:text-yellow-200 text-sm">
            Include an <code className="bg-yellow-100 dark:bg-yellow-900/40 px-2 py-1 rounded">Authorization</code> header with the value <code className="bg-yellow-100 dark:bg-yellow-900/40 px-2 py-1 rounded">Bearer vercel-lab-token</code> in your request.
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <Link 
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Return to Home
          </Link>
          
          <Link
            href="/api/secure-data"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline text-sm"
          >
            Try API Endpoint Again
          </Link>
        </div>
      </div>
    </div>
  );
}
