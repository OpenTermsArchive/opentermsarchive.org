import React, { ReactElement } from 'react';
import useTranslationNextTranslate from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

export default function useTranslation(namespace?: string) {
  const { lang, t: tNextTranslate } = useTranslationNextTranslate(namespace);

  const t = (
    i18nKey: string,
    values?: { [name: string]: string | number },
    options?: { fallback?: string }
  ) => {
    return tNextTranslate(i18nKey, values, options);
  };

  const tC = (
    i18nKey: string,
    values?: { [name: string]: string | number },
    tOptions?: { fallback?: string } & {
      components: ReactElement[] | Record<string, ReactElement>;
    }
  ) => {
    const { components, ...options } = tOptions || {};

    return (
      <Trans
        i18nKey={i18nKey as string}
        values={values || undefined}
        components={components}
        {...options}
      />
    );
  };

  return { lang, t, tC };
}
