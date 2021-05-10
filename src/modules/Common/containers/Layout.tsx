import React, { ReactNode } from 'react';

import { Analytics } from 'modules/Analytics';
import Footer from './Footer';
import FullPageLayout from 'containers/FullPageLayout';
import Head from 'next/head';
import Header from './Header';
import s from './Layout.module.css';

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
    <FullPageLayout>
      <FullPageLayout.Header className={s.header}>
        <Header />
      </FullPageLayout.Header>
      <FullPageLayout.Main className={s.main}>
        <div>{children}</div>
      </FullPageLayout.Main>
      <FullPageLayout.Footer className={s.footer}>
        <Footer />
      </FullPageLayout.Footer>
    </FullPageLayout>
  </div>
);

export default Layout;
