import 'modules/Wdyr';
// FIXME All global css must be loaded from _app
// This means that all scss files using animations must be loaded here
// This is bad as it breaks the modularity of components
// Go Fix it
import 'modules/Design/styles/vendor/minireset.css';
import 'modules/Design/styles/base.css';
// NProgress
import 'nprogress/nprogress.css'; //styles of nprogress//Binding events.
import 'modules/NProgress/nprogress.theme.scss';
import 'modules/NProgress'; //nprogress module

import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { fetcher } from 'utils/api';

function MyApp({ Component, pageProps }: AppProps) {
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

export default MyApp;
