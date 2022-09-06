import { NextRequest } from 'next/server';
import i18nMiddleware from 'modules/I18n/middleware';

export function middleware(request: NextRequest) {
  return i18nMiddleware(request);
}
