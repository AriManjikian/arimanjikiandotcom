'use client';
import { Copy } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import { JSX } from 'react';
interface MarkdownSectionProps {
  title: string;
  children: React.ReactNode;
  level?: 1 | 2 | 3;
}

export const MarkdownSection: React.FC<MarkdownSectionProps> = ({ title, children, level = 2 }) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  const getHeadingStyle = () => {
    switch (level) {
      case 1:
        return 'text-3xl md:text-4xl font-bold mb-6 pb-3 border-b border-neutral-300';
      case 2:
        return 'text-2xl md:text-3xl font-semibold mb-4 mt-8';
      case 3:
        return 'text-xl md:text-2xl font-medium mb-3 mt-6';
      default:
        return 'text-xl font-medium mb-3';
    }
  };

  const getPrefix = () => {
    switch (level) {
      case 1:
        return '# ';
      case 2:
        return '## ';
      case 3:
        return '### ';
      default:
        return '## ';
    }
  };

  return (
    <section className="mb-8">
      <HeadingTag className={`font-mono ${getHeadingStyle()}`}>
        <span className="text-neutral-500">{getPrefix()}</span>
        {title}
      </HeadingTag>
      <div className="font-mono text-sm md:text-base leading-relaxed">{children}</div>
    </section>
  );
};

interface MarkdownCodeProps {
  children: string;
  language?: string;
  inline?: boolean;
}

export const MarkdownCode: React.FC<MarkdownCodeProps> = ({ children, language = '', inline = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };
  if (inline) {
    return <code className="bg-indigo-950 px-1 py-0.5 rounded font-mono text-sm">{children}</code>;
  }

  return (
    <div className="my-4">
      <div className="text-neutral-100 bg-indigo-950 rounded-lg overflow-hidden">
        {language && (
          <span className="bg-green-500 px-4 py-2 flex justify-between items-center">
            <div className="text-sm font-mono text-primary-foreground">{language}</div>
            <button onClick={handleCopy} className="hover:opacity-80 transition">
              <Copy className="text-black size-4" />
            </button>
          </span>
        )}
        <pre className="p-4 overflow-x-auto">
          <code className="font-mono text-sm">{children}</code>
        </pre>
      </div>
    </div>
  );
};

interface MarkdownListProps {
  items: (string | React.ReactNode)[];
  ordered?: boolean;
  nested?: boolean;
}

export const MarkdownList: React.FC<MarkdownListProps> = ({ items, ordered = false, nested = false }) => {
  const ListTag = ordered ? 'ol' : 'ul';
  const listStyle = ordered ? 'list-decimal' : 'list-disc';
  const marginClass = nested ? 'ml-6' : 'ml-4';

  return (
    <ListTag className={`${listStyle} ${marginClass} my-4 space-y-2`}>
      {items.map((item, index) => (
        <li key={index} className="font-mono list-none">
          <span className="text-neutral-500 mr-2">{ordered ? `${index + 1}.` : '-'}</span>
          {item}
        </li>
      ))}
    </ListTag>
  );
};

interface MarkdownTableProps {
  headers: string[];
  rows: string[][];
}

export const MarkdownTable: React.FC<MarkdownTableProps> = ({ headers, rows }) => {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full border-collapse font-mono text-sm">
        <thead>
          <tr className="border-b-2 border-neutral-300">
            {headers.map((header, index) => (
              <th key={index} className="text-left py-2 px-4 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-neutral-200">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="py-2 px-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface MarkdownBlockquoteProps {
  children: React.ReactNode;
  author?: string;
}

export const MarkdownBlockquote: React.FC<MarkdownBlockquoteProps> = ({ children, author }) => {
  return (
    <blockquote className="border-l-4 border-neutral-300 pl-4 py-2 my-4 italic font-mono">
      <span className="text-neutral-500 mr-2">&gt;</span>
      {children}
      <footer className="text-sm text-neutral-600 mt-2 not-italic">{author && <>— {author}</>}</footer>
    </blockquote>
  );
};

interface MarkdownLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

export const MarkdownLink: React.FC<MarkdownLinkProps> = ({ href, children, external = false }) => {
  return (
    <a
      href={href}
      className="underline text-blue-300 hover:text-white font-mono"
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      [{children}]({href})
    </a>
  );
};

export const MarkdownHorizontalRule: React.FC = () => {
  return (
    <div className="my-8 text-center">
      <hr className="border-neutral-300" />
      <span className="text-neutral-500 font-mono text-sm">---</span>
    </div>
  );
};

interface MarkdownTextProps {
  children: React.ReactNode;
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
}

export const MarkdownText: React.FC<MarkdownTextProps> = ({
  children,
  bold = false,
  italic = false,
  strikethrough = false,
}) => {
  let className = 'font-mono';
  let wrapper = '';

  if (bold) {
    className += ' font-bold';
    wrapper += '**';
  }
  if (italic) {
    className += ' italic';
    wrapper += '*';
  }
  if (strikethrough) {
    className += ' line-through';
    wrapper += '~~';
  }

  return (
    <span className={className}>
      <span className="text-neutral-500">{wrapper}</span>
      {children}
      <span className="text-neutral-500">{wrapper.split('').reverse().join('')}</span>
    </span>
  );
};
