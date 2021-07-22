import { Router, useRouter } from 'next/router';

import React from 'react';
import queryString from 'query-string';

interface IParams {
  url?: string;
  param: string;
  value: string | string[] | number | null;
}

interface IParamsObject {
  [key: string]: string | string[] | undefined;
}

type IParamsAs = Parameters<Router['push']>[1];
type IParamsOptions = Parameters<Router['push']>[2];

const useUrl = () => {
  const router = useRouter();
  // Here we do not use next router because on first request, queryParams will be empty
  // https://github.com/vercel/next.js/issues/10521
  const queryParams: any =
    typeof window !== 'undefined'
      ? queryString.parse(window.location.search, { arrayFormat: 'bracket' })
      : {};

  const pathname = router.pathname;

  const setQueryParameter = React.useCallback(
    ({ url, param, value }: IParams) => {
      const parsed = queryString.parse(window.location.search, { arrayFormat: 'bracket' });

      if (value === '' || value === null || (Array.isArray(value) && value.length === 0)) {
        delete parsed[param];
      } else {
        // @ts-ignore
        parsed[param] = value;
      }

      const stringified = queryString.stringify(parsed, { arrayFormat: 'bracket' });
      return `${url || pathname}?${stringified}`;
    },
    [pathname, queryParams]
  );

  const pushParam = React.useCallback(
    (params: IParams, as?: IParamsAs, options?: IParamsOptions) => {
      const newUrl = setQueryParameter(params);
      return router.push(newUrl, as, options);
    },
    [router, setQueryParameter]
  );

  const pushQueryParams = React.useCallback(
    (newUrlParams: IParamsObject, as?: IParamsAs, options?: IParamsOptions) => {
      const parsed = queryString.parse(window.location.search, { arrayFormat: 'bracket' });

      for (const newUrlParam in newUrlParams) {
        const value: any = newUrlParams[newUrlParam];
        if (!!value) {
          parsed[newUrlParam] = value;
        } else {
          // we remove the param if it is empty
          delete parsed[newUrlParam];
        }
      }

      const newParsed = queryString.stringify(newUrlParams);

      const newUrl = `${pathname}${newParsed ? `?${newParsed}` : ''}`;
      router.push(newUrl, as, options);
      return newUrl;
    },
    [router, pathname, queryParams]
  );

  const replaceQueryParams = (
    newUrlParams: IParamsObject,
    as?: IParamsAs,
    options?: IParamsOptions
  ) => {
    const parsed = queryString.stringify(newUrlParams);
    return router.push(`${pathname}${parsed ? `?${parsed}` : ''}`, as, options);
  };

  const pushQueryParam = React.useCallback(
    (paramName: string) => (value: string | number | string[]) =>
      pushParam({ param: paramName, value }),
    [pushParam]
  );

  const removeQueryParam = React.useCallback(
    (paramName: string, as?: IParamsAs, options?: IParamsOptions) => {
      pushQueryParams({ ...queryParams, [paramName]: undefined }, as, options);
    },
    [pushQueryParams, queryParams]
  );

  return {
    queryParams,
    replaceQueryParams,
    pushQueryParams,
    pushQueryParam,
    removeQueryParam,
  };
};

export default useUrl;
