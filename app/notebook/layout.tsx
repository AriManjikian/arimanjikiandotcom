import Link from 'next/link';
import type { ReactNode } from 'react';

export default function NotebookLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/notebook" className="text-2xl font-bold text-primary tracking-tight">
            Notes
          </Link>
          <nav>
            <Link href="/" className="text-foreground hover:text-primary text-sm">
              Home
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
