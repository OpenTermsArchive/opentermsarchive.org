import 'modules/Wdyr';
//Import global css reset
import 'modules/Common/styles/vendor/minireset.css';
//Import global css styles
import 'modules/Common/styles/theme.css';
import 'modules/Common/styles/loader.css';
// NProgress
import 'nprogress/nprogress.css'; //styles of nprogress//Binding events.
import 'modules/NProgress/nprogress.theme.scss';
import 'modules/NProgress'; //nprogress module

import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { appWithTranslation } from 'next-i18next';
import { fetcher } from 'utils/api';

function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default appWithTranslation(App);
