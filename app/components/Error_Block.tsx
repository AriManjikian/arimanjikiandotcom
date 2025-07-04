'use client';

import { useState, useEffect } from 'react';

const Error_Block = () => {
  const [latestError, setLatestError] = useState(null);

  useEffect(() => {
    const fetchError = async () => {
      try {
        const res = await fetch('https://neovim-latest-error.arikevorkmanjikian.workers.dev/');
        if (!res.ok) throw new Error('Failed to fetch error');
        const data = await res.json();
        setLatestError(data);
      } catch (err) {
        console.error('Error fetching latest error:', err);
      }
    };

    fetchError();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h2 className="mb-4 text-red-500 font-mono text-lg">
        ┌─ <span className="text-red-400">Latest Error I&apos;ve Encountered</span>
      </h2>
      {latestError && (
        <div className="rounded w-full bg-black text-red-500 p-4 text-sm font-mono border border-red-700 shadow-inner whitespace-pre-wrap overflow-x-auto">
          <div className="pb-2 border-b border-red-800 mb-2">
            <span className="text-red-400">┌─</span> Latest Error Log
          </div>
          <div className="space-y-1">
            <div>
              <span className="text-red-400">File:</span> <span className="break-words">{latestError.filepath}</span>
            </div>
            <div>
              <span className="text-red-400">Line:</span> {latestError.line},{' '}
              <span className="text-red-400">Column:</span> {latestError.column}
            </div>
            <div>
              <span className="text-red-400">Message:</span> <span className="break-words">{latestError.message}</span>
            </div>
            <div>
              <span className="text-red-400">Timestamp:</span> {latestError.timestamp}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Error_Block;
