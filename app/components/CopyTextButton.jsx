'use client';

import { useState } from 'react';

export default function CopyTextButton({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false);

  async function onClick() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" className="btn btn-ghost btn-sm" onClick={onClick}>
      {copied ? 'Copied' : label}
    </button>
  );
}
