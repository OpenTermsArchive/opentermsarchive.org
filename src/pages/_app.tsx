import 'modules/Wdyr';
//Import global css reset
import 'modules/Common/styles/vendor/minireset.css';
import 'modules/Common/styles/loader.css';
// NProgress
import 'nprogress/nprogress.css'; //styles of nprogress//Binding events.
import 'modules/NProgress/nprogress.theme.css';
import 'modules/NProgress'; //nprogress module

import { AppProps } from 'next/app';
import { NotifierContainer } from 'hooks/useNotifier';
import { SWRConfig } from 'swr';
import { appWithTranslation } from 'next-i18next';
import { fetcher } from 'utils/api';

import useLocale from 'modules/I18n/hooks/useLocale';

function App({ Component, pageProps }: AppProps) {
  useLocale(pageProps.locale);

  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      {' '}
      <NotifierContainer />
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default appWithTranslation(App);
