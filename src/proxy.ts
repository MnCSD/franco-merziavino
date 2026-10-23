import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LOCALE, LOCALES } from '@/lib/i18n/config';

/**
 * Next.js 16 `proxy` (formerly middleware): redirect locale-less paths
 * to /el or /en, preferring a saved cookie, then the browser language.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  const saved = req.cookies.get('locale')?.value;
  const header = req.headers.get('accept-language') ?? '';
  const locale =
    saved && (LOCALES as string[]).includes(saved)
      ? saved
      : header.toLowerCase().startsWith('en')
        ? 'en'
        : DEFAULT_LOCALE;

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|images|favicon.ico|.*\\..*).*)'],
};
