import { NextResponse, type NextRequest } from 'next/server';

const locales = ['en', 'fr', 'nl'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Check browser language (optional, defaulting to 'en' for now for simplicity)
    // You could parse the 'accept-language' header here
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname === '/' ? '' : pathname}`, request.url)
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, etc.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|uploads|blocks|admin).*)'],
};
