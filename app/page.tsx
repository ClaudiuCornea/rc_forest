import { redirect } from 'next/navigation';

export default function RootPage() {
  // This will be caught by middleware most of the time, 
  // but as a fallback, we redirect to the default locale.
  redirect('/en');
}
