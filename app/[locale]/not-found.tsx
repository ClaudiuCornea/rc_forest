import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
      <h2 className="font-display text-4xl sm:text-6xl text-white mb-4">404 - Page Not Found</h2>
      <p className="font-sans text-club-gray mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-club-red text-white font-cond font-bold text-sm tracking-[0.125rem] uppercase px-8 py-4 transition-all hover:-translate-y-1"
      >
        Return Home
      </Link>
    </div>
  )
}
