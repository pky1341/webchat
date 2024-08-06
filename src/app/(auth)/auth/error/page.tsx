"use client";

import { useSearchParams } from 'next/navigation';

export default function AuthError() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-4 text-red-600">Authentication Error</h1>
                <p className="text-gray-700">{error || 'An unknown error occurred during authentication.'}</p>
                <a href="/sign-in" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Return to Sign In
                </a>
            </div>
        </div>
    );
}