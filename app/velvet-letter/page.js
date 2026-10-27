import { redirect } from 'next/navigation';

// The Velvet Letter lives on /velvet. Old links, including the book QR
// path's sibling /velvet-letter, land there.
export default function VelvetLetterRedirect() {
  redirect('/velvet');
}
