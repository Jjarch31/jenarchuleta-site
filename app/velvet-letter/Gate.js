'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { unlockVelvetLetter } from './actions';

export default function VelvetLetterGate() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setPending(true);
    setError(false);
    const result = await unlockVelvetLetter(new FormData(event.currentTarget));
    setPending(false);
    if (!result?.ok) {
      setError(true);
      return;
    }
    router.refresh();
  }

  return (
    <form className="vl-gate" onSubmit={onSubmit}>
      <label htmlFor="velvet-passcode">Passcode</label>
      <input
        id="velvet-passcode"
        name="passcode"
        type="password"
        autoComplete="off"
        required
      />
      <button className="btn btn-primary" type="submit" disabled={pending}>
        Enter Your Passcode
      </button>
      {error ? (
        <p className="vl-error" role="alert">
          That passcode didn’t open the door. Check the code in your book and try again.
        </p>
      ) : null}
    </form>
  );
}
