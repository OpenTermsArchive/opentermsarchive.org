import React, { ReactNode } from 'react';

import { Analytics } from 'modules/Analytics';
import Footer from './Footer';
import Head from 'next/head';
import Header from './Header';
import l from './Layout.module.css';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Analytics />
    <Header />
    <div className={l.container}>
      <div className={l.wrapper}>
        {children}
      </div>
    </div>
    <Footer />
  </>
);

export default Layout;
