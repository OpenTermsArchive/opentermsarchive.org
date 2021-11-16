# Analytics module

For now, we support matomo through the library [@socialgouv/matomo-next](https://github.com/SocialGouv/matomo-next)

## install

copy the whole module to your nextjs app and launch

```
  npm run install @socialgouv/matomo-next
```

## usage

To use this module in a Next.js app, just import the component and put it in your `_app.tsx` or in your `Layout.tsx`

```
import { Analytics } from 'modules/Analytics';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
        <Analytics />
        <Component {...pageProps} />
      </>
  );
}

export default MyApp;

```
