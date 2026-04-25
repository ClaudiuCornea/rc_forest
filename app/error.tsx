'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
      <h2 className="font-display text-4xl sm:text-6xl text-white mb-4">Something went wrong!</h2>
      <p className="font-sans text-club-gray mb-8 max-w-md">
        We apologize for the inconvenience. An unexpected error has occurred.
      </p>
      <button
        onClick={() => reset()}
        className="bg-club-red text-white font-cond font-bold text-sm tracking-[0.125rem] uppercase px-8 py-4 transition-all hover:-translate-y-1"
      >
        Try again
      </button>
    </div>
  )
}
