# usage

```
import React, { ReactNode } from 'react';

import { Analytics } from 'modules/Analytics';
import FullPageWithOneMenu from 'containers/FullPageWithOneMenu';
import Head from 'next/head';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Analytics />
    <FullPageWithOneMenu>
      <FullPageWithOneMenu.Header>header</FullPageWithOneMenu.Header>
      <FullPageWithOneMenu.Menu>menu</FullPageWithOneMenu.Menu>
      <FullPageWithOneMenu.Main>{children}</FullPageWithOneMenu.Main>
    </FullPageWithOneMenu>
  </div>
);

export default Layout;
```
