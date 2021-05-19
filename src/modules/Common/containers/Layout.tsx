import React, { ReactNode } from 'react';

import { Analytics } from 'modules/Analytics';
import Container from './Container';
import { FiGithub } from 'react-icons/fi';
import Footer from './Footer';
import FooterMenu from '../components/FooterMenu';
import Head from 'next/head';
import Header from './Header';
import HeaderMenu from '../components/HeaderMenu';
import LanguageSwitcher from 'modules/I18n/components/LanguageSwitcher';
import Link from 'next/link';
import classNames from 'classnames';

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

    {/* Header */}
    <Container paddingY={false} paddingX={false} layout="fluid">
      <Container gridCols="12" gridGutters="11" flex={true} paddingX={false} paddingY={false}>
        <Header>
          <HeaderMenu>
            <ul>
              <li>
                <Link href="/#how">How ?</Link>
              </li>
              <li>
                <Link href="/#values">Values</Link>
              </li>
              <li>
                <Link href="/#conntribute">Contribute</Link>
              </li>
              <li>
                <Link href="/#built-with">Built with</Link>
              </li>
            </ul>
          </HeaderMenu>
          <HeaderMenu>
            <LanguageSwitcher />
            <Link href="https://github.com/ambanum/OpenTermsArchive/">
              <a className={classNames('icon_github_circle')}>
                <FiGithub color="#fefffd" />
              </a>
            </Link>
          </HeaderMenu>
        </Header>
      </Container>
    </Container>

    {children}

    {/* Footer */}
    <Container paddingY={false} gray={true} layout="fluid">
      <Container
        gridCols="12"
        gridGutters="11"
        flex={true}
        paddingX={false}
        paddingY={true}
        paddingYSmall={true}
      >
        <Footer>
          <FooterMenu>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/#how">How ?</Link>
              </li>
              <li>
                <Link href="/#contribute">Contribute</Link>
              </li>
              <li>
                <Link href="/#values">Values</Link>
              </li>
              <li>
                <Link href="/#built-with">Build with</Link>
              </li>
              <li>
                <Link href="https://disinfo.quaidorsay.fr/api/open-terms-archive/docs">API</Link>
              </li>
              <li>
                <Link href="https://github.com/ambanum/OpenTermsArchive-versions/releases">
                  Dataset
                </Link>
              </li>
            </ul>
          </FooterMenu>
          <FooterMenu small={true}>
            <ul>
              <li>
                <Link href="/">Terms and conditions</Link>
              </li>
              <li>
                <Link href="/">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/">Sitemap</Link>
              </li>
              <li>
                <Link href="https://github.com/ambanum/OpenTermsArchive">GitHub</Link>
              </li>
            </ul>
          </FooterMenu>
        </Footer>
      </Container>
    </Container>
  </>
);

export default Layout;
