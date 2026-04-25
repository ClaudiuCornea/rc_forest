"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const SUPPORTED_LOCALES = ["en", "fr", "nl"];

/**
 * Root page component that handles redirection to the default locale.
 * Also serves as a catch-all for basic locale validation in 'output: export' mode.
 */
export default function RootPage() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // For pure static exports, we just want to ensure the user lands on a supported locale
    if (!pathname) return;
    const segments = pathname.split("/");
    const currentLocale = segments[1];

    if (!SUPPORTED_LOCALES.includes(currentLocale)) {
      router.replace("/en");
    }
  }, [router, pathname]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="size-12 border-4 border-club-red border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
