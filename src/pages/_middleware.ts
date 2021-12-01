import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { i18n } from '../../next.config';

const PUBLIC_FILE = /\.([a-zA-Z]+$)/;

export function middleware(request: NextRequest) {
  const { pathname, search, locale } = request.nextUrl;
  const shouldHandleLocale =
    !PUBLIC_FILE.test(pathname) && !pathname.includes('/api/') && locale === 'default';

  acceptLanguage.languages(i18n.locales?.filter((locale) => locale !== 'default'));
  const detectedLocale = acceptLanguage.get(request.headers.get('accept-language'));

  return shouldHandleLocale && NextResponse.redirect(`/${detectedLocale}/en${pathname}${search}`);
}
