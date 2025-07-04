'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { postMap } from '../postMap';

export default function NotePostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;

  const loader = postMap[slug];
  if (!loader) {
    console.error(`No post component found for slug "${slug}"`);
    notFound();
  }

  const PostComponent = dynamic(loader, {
    loading: () => <div>Loading post...</div>,
    ssr: false,
  });

  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <PostComponent />
    </main>
  );
}
