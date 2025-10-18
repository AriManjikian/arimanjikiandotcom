import React from 'react';
import {
  MarkdownSection,
  MarkdownText,
  MarkdownCode,
  MarkdownBlockquote,
  MarkdownList,
  MarkdownLink,
  MarkdownTable,
  MarkdownHorizontalRule,
} from '../../components/MarkdownComponents';

const NeovimLatestErrorPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <MarkdownSection title="🚀 How I Connected Neovim to My Website to Log My Latest Syntax Error" level={1}>
        <p className="mt-2 mb-6 text-gray-700">
          Recently I built a small plugin that sends my <MarkdownText italic>latest Neovim syntax error</MarkdownText>{' '}
          to my website using <MarkdownText bold>Cloudflare Workers</MarkdownText> and{' '}
          <MarkdownText bold>KV storage</MarkdownText>. Here’s how I set it up.
        </p>
      </MarkdownSection>

      <MarkdownSection title="🧠 The Idea" level={2}>
        <p className="mb-4">Every time I make a syntax error in Neovim, I wanted it to automatically be:</p>
        <MarkdownList
          items={[
            'Captured using Neovim’s built-in LSP diagnostics',
            'Filtered to avoid duplicates',
            'Pushed to a Cloudflare Worker endpoint',
            'Stored in KV and displayed on my personal site',
          ]}
        />
      </MarkdownSection>

      <MarkdownSection title="⚡ The Neovim Side" level={2}>
        <p className="mb-4">
          I wrote a simple Lua plugin that hooks into <MarkdownCode inline>DiagnosticChanged</MarkdownCode> and sends
          the latest error to Cloudflare using
          <MarkdownCode inline>curl</MarkdownCode>:
        </p>
        <MarkdownCode language="lua">
          {`vim.api.nvim_create_autocmd("DiagnosticChanged", {
  group = vim.api.nvim_create_augroup("LatestError", { clear = true }),
  callback = log_and_push,
  desc = "Push latest error to Cloudflare"
})`}
        </MarkdownCode>
        <p className="mt-4">It collects the error, checks for duplicates, and pushes JSON to the Worker:</p>
        <MarkdownCode language="lua">
          {`local curl_cmd = {
  'curl', '-s', '-X', 'POST',
  '-H', 'Content-Type: application/json',
  '-H', 'User-Agent: nvim-latest-error/1.0',
  '-d', vim.fn.json_encode(data),
  '--write-out', '%{http_code}',
  CLOUD_FLARE_URL
}
vim.fn.jobstart(curl_cmd, { ... })`}
        </MarkdownCode>
      </MarkdownSection>

      <MarkdownSection title="🌐 The Cloudflare Worker" level={2}>
        <p className="mb-4">
          On the server side, I used a simple Cloudflare Worker to accept the JSON, store it in KV, and return it later
          via GET:
        </p>
        <MarkdownCode language="javascript">
          {`export default {
  async fetch(request, env) {
    if (request.method === 'POST') {
      const body = await request.json();
      await env.ERRORS.put('latest_error', JSON.stringify(body));
      return new Response('OK', { status: 200 });
    }

    if (request.method === 'GET') {
      const latest = await env.ERRORS.get('latest_error');
      return new Response(latest || '{}', { headers: { 'Content-Type': 'application/json' } });
    }

    return new Response('Method not allowed', { status: 405 });
  }
};`}
        </MarkdownCode>

        <MarkdownBlockquote>
          <MarkdownText italic>
            KV is perfect for this use case — it’s fast, distributed, and I only need to store one object.
          </MarkdownText>
        </MarkdownBlockquote>
      </MarkdownSection>

      <MarkdownSection title="🗂️ Data Format" level={2}>
        <p className="mb-4">Here’s the structure I store in KV for each error:</p>
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

      <MarkdownSection title="🖥️ Displaying It on My Site" level={2}>
        <p className="mb-4">Fetching the latest error from my Worker is as simple as:</p>
        <MarkdownCode language="javascript">
          {`fetch('https://neovim-latest-error.example.workers.dev/')
  .then(res => res.json())
  .then(data => {
    console.log('Latest error:', data);
  });`}
        </MarkdownCode>
        <p className="mt-4">
          On my dashboard, I display the filename, location, error message, and timestamp in a small widget.
        </p>
      </MarkdownSection>

      <MarkdownHorizontalRule />

      <MarkdownSection title="✨ Final Thoughts" level={2}>
        <MarkdownBlockquote author="Me">
          This was a fun afternoon project that tied together <MarkdownText bold>Neovim</MarkdownText>,{' '}
          <MarkdownText bold>Cloudflare Workers</MarkdownText>, and <MarkdownText bold>KV</MarkdownText> into a personal
          error feed.
        </MarkdownBlockquote>

        <MarkdownList
          ordered
          items={[
            '📝 Neovim captures and sends the error',
            '🌩 Cloudflare Worker stores it in KV',
            '🌐 My website fetches and displays it live',
          ]}
        />

        <p className="mt-4">
          You can check out the full source code on{' '}
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
