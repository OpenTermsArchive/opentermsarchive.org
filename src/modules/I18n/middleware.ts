import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { i18n } from './next-i18next.config';

const PUBLIC_FILE = /\.([a-zA-Z]+$)/;

const PERMANENT_REDIRECT_CODE = 301;

export default function middleware(request: NextRequest) {
  const { pathname, search, locale, origin } = request.nextUrl;

  const shouldHandleLocale =
    !PUBLIC_FILE.test(pathname) &&
    locale === 'default' &&
    !pathname.includes('/api/') &&
    !pathname.includes('/fonts/');

  if (!shouldHandleLocale) {
    return;
  }

  acceptLanguage.languages(i18n.locales?.filter((locale) => locale !== 'default'));
  const detectedLocale = acceptLanguage.get(request.headers.get('accept-language'));

  return NextResponse.redirect(
    `${origin}/${detectedLocale}${pathname}${search}`,
    PERMANENT_REDIRECT_CODE
  );
}
