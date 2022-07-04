import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { i18n } from '../../next.config';

const PUBLIC_FILE = /\.([a-zA-Z]+$)/;

export function middleware(request: NextRequest) {
  const { pathname, search, locale } = request.nextUrl;

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

  return NextResponse.redirect(`/${detectedLocale}${pathname}${search}`);
}
