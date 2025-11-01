'use client';
import React from 'react';
import {
  MarkdownSection,
  MarkdownText,
  MarkdownCode,
  MarkdownList,
  MarkdownTable,
  MarkdownBlockquote,
  MarkdownLink,
  MarkdownHorizontalRule,
} from '../../components/MarkdownComponents';

const NeovimLatestErrorPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <MarkdownSection title="How I Log My Latest Neovim Error to My Website" level={1}>
        <p>
          I wanted a simple way to see my latest Neovim syntax error on my site. So I connected Neovim to a Cloudflare
          Worker and KV storage. Here’s how I did it.
        </p>
      </MarkdownSection>

      <MarkdownSection title="The Idea" level={2}>
        <p>Whenever I make a syntax error in Neovim, I wanted it to:</p>
        <MarkdownList
          items={[
            'Capture it via Neovim’s LSP diagnostics',
            'Avoid duplicates',
            'Send it to a Cloudflare Worker',
            'Store it in KV and show it on my site',
          ]}
        />
      </MarkdownSection>

      <MarkdownSection title="Neovim Setup" level={2}>
        <p>
          I wrote a small Lua plugin that hooks into <MarkdownCode inline>DiagnosticChanged</MarkdownCode> and sends the
          error via <MarkdownCode inline>curl</MarkdownCode>:
        </p>
        <MarkdownCode language="lua">
          {`vim.api.nvim_create_autocmd("DiagnosticChanged", {
  group = vim.api.nvim_create_augroup("LatestError", { clear = true }),
  callback = log_and_push,
})`}
        </MarkdownCode>
        <p>It collects the error, filters duplicates, and pushes JSON to my Worker.</p>
      </MarkdownSection>

      <MarkdownSection title="Cloudflare Worker" level={2}>
        <p>On the server side, I just accept JSON, store it in KV, and serve it back:</p>
        <MarkdownCode language="javascript">
          {`export default {
  async fetch(request, env) {
    if (request.method === 'POST') {
      const body = await request.json();
      await env.ERRORS.put('latest_error', JSON.stringify(body));
      return new Response('OK');
    }

    if (request.method === 'GET') {
      const latest = await env.ERRORS.get('latest_error');
      return new Response(latest || '{}', { headers: { 'Content-Type': 'application/json' } });
    }

    return new Response('Method not allowed', { status: 405 });
  }
};`}
        </MarkdownCode>
      </MarkdownSection>

      <MarkdownSection title="Data Format" level={2}>
        <p>Each error I store has:</p>
        <MarkdownTable
          headers={['Field', 'Type', 'Description']}
          rows={[
            ['filepath', 'string', 'Absolute path of the file with the error'],
            ['line', 'number', '1-based line number'],
            ['column', 'number', '1-based column number'],
            ['message', 'string', 'The error message'],
            ['timestamp', 'string (ISO)', 'UTC timestamp of when the error occurred'],
          ]}
        />
      </MarkdownSection>

      <MarkdownSection title="Display on My Site" level={2}>
        <p>Fetching it is simple:</p>
        <MarkdownCode language="javascript">
          {`fetch('https://neovim-latest-error.example.workers.dev/')
  .then(res => res.json())
  .then(data => console.log('Latest error:', data));`}
        </MarkdownCode>
        <p>I show filename, location, message, and timestamp in a small widget on my dashboard.</p>
      </MarkdownSection>

      <MarkdownHorizontalRule />

      <MarkdownSection title="Final Thoughts" level={2}>
        <MarkdownBlockquote>
          This was a fun project that tied together <MarkdownText bold>Neovim</MarkdownText>,{' '}
          <MarkdownText bold>Cloudflare Workers</MarkdownText>, and <MarkdownText bold>KV</MarkdownText> into a live
          error feed.
        </MarkdownBlockquote>

        <MarkdownList
          ordered
          items={['Neovim captures and sends the error', 'Worker stores it in KV', 'Website displays it live']}
        />

        <p>
          Full source code is on{' '}
          <MarkdownLink href="https://github.com/ari-manji/nvim-latest-error" external>
            GitHub
          </MarkdownLink>
          .
        </p>
      </MarkdownSection>
    </div>
  );
};

export default NeovimLatestErrorPage;
