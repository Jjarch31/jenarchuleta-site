'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { unlockVelvetPages } from './actions';

export default function VelvetGate() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setPending(true);
    setError(false);
    const result = await unlockVelvetPages(new FormData(event.currentTarget));
    setPending(false);
    if (!result?.ok) {
      setError(true);
      return;
    }
    router.refresh();
  }

  return (
    <form className="vp-gate" onSubmit={onSubmit}>
      <label htmlFor="velvet-pages-passcode">Passcode</label>
      <input
        id="velvet-pages-passcode"
        name="passcode"
        type="password"
        autoComplete="off"
        required
      />
      <button className="btn btn-ghost" type="submit" disabled={pending}>
        Enter
      </button>
      {error ? (
        <p className="vp-error" role="alert">
          That passcode didn’t open the door. The code is printed inside the book.
        </p>
      ) : null}
    </form>
  );
}
