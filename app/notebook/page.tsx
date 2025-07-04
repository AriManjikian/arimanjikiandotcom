import { notes } from './notes';
import Link from 'next/link';
export default function NotebookIndex() {
  return (
    <div className="min-h-screen bg-background text-secondary">
      <main className="max-w-4xl mx-auto px-4 py-10">
        <header className="mb-10">
          <p className="text-primary">
            - I post things I’m learning, experimenting with, or just want to write down in my notebook.
          </p>
        </header>

        <div className="grid gap-6">
          {notes.map(note => (
            <Link
              key={note.slug}
              href={`/notebook/notes/${note.slug}`}
              className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition"
            >
              <p className="text-sm text-foreground mb-1">{note.date}</p>
              <h3 className="text-xl font-bold text-primary mb-2">{note.title}</h3>
              <p className="text-foreground">{note.summary}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
