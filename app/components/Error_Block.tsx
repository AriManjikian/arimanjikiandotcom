'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

type LatestError = {
  filepath: string;
  line: number;
  column: number;
  message: string;
  timestamp: number;
};

const Error_Block = () => {
  const [latestError, setLatestError] = useState<LatestError | null>(null);

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

      <Link
        href="/notebook/notes/latest_error"
        className="mt-3 inline-block font-mono text-xs text-red-400 underline decoration-red-700 underline-offset-4
                   hover:text-red-300 hover:decoration-red-500
                   border border-red-800/60 bg-black px-3 py-1 rounded-sm
                   shadow-inner transition"
      >
        &gt; how this error feed is built
      </Link>
    </div>
  );
};

export default Error_Block;
