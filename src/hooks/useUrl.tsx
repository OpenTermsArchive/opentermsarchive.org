import React from 'react';
import queryString from 'query-string';
import { useRouter } from 'next/router';

interface IParams {
  url?: string;
  param: string;
  value: string | string[] | number | null;
}

interface IParamsObject {
  [key: string]: string | string[] | undefined;
}

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
    (params: IParams) => {
      const newUrl = setQueryParameter(params);
      return router.push(newUrl);
    },
    [router, setQueryParameter]
  );

  const pushQueryParams = React.useCallback(
    (newUrlParams: IParamsObject) => {
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

      const newUrl = `${pathname}?${queryString.stringify(parsed)}`;
      router.push(newUrl);
      return newUrl;
    },
    [router, pathname, queryParams]
  );

  const replaceQueryParams = (newUrlParams: IParamsObject) => {
    return router.push(`${pathname}?${queryString.stringify(newUrlParams)}`);
  };

  const pushQueryParam = React.useCallback(
    (paramName: string) => (value: string | number | string[]) =>
      pushParam({ param: paramName, value }),
    [pushParam]
  );

  const removeQueryParam = React.useCallback(
    (paramName: string) => {
      pushQueryParams({ ...queryParams, [paramName]: undefined });
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
