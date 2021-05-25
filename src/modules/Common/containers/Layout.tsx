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
import { useTranslation } from 'next-i18next';

type Props = {
  children?: ReactNode;
  title?: string;
  desc?: string;
};

const Layout = ({
  children,
  title = 'This is the default title',
  desc = 'This is the default desc',
}: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Analytics />

      {/* Header */}
      <Container paddingY={false} paddingX={false} layout="fluid">
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false} paddingY={false}>
          <Header>
            <HeaderMenu>
              <ul>
                <li>
                  <Link href={'/#'.concat(t('common:home_page.how.id'))}>
                    {t('common:header.link.how', 'How')}
                  </Link>
                </li>
                <li>
                  <Link href={'/#'.concat(t('common:home_page.values.id'))}>
                    {t('common:header.link.values', 'Values')}
                  </Link>
                </li>
                <li>
                  <Link href={'/#'.concat(t('common:home_page.contribute.id'))}>
                    {t('common:header.link.contribute', 'Contribute')}
                  </Link>
                </li>
                <li>
                  <Link href={'/#'.concat(t('common:home_page.showcase.id'))}>
                    {t('common:header.link.showcase', 'Built with')}
                  </Link>
                </li>
              </ul>
            </HeaderMenu>
            <HeaderMenu>
              <LanguageSwitcher />
              <Link href="https://github.com/ambanum/OpenTermsArchive/">
                <a className={classNames('icon_github_circle')} target="_blank">
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
                  <Link href="/">{t('common:footer.link.home', 'Home')}</Link>
                </li>
                <li>
                  <Link href={'/#'.concat(t('common:home_page.how.id'))}>
                    {t('common:footer.link.how', 'How')}
                  </Link>
                </li>
                <li>
                  <Link href={'/#'.concat(t('common:home_page.values.id'))}>
                    {t('common:footer.link.values', 'Values')}
                  </Link>
                </li>
                <li>
                  <Link href={'/#'.concat(t('common:home_page.contribute.id'))}>
                    {t('common:footer.link.contribute', 'Contribute')}
                  </Link>
                </li>
                <li>
                  <Link href={'/#'.concat(t('common:home_page.showcase.id'))}>
                    {t('common:footer.link.showcase', 'Built with')}
                  </Link>
                </li>
                <li>
                  <Link href="https://disinfo.quaidorsay.fr/api/open-terms-archive/docs">
                    {t('common:footer.link.api', 'API')}
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/ambanum/OpenTermsArchive-versions/releases">
                    <a target="_blank">{t('common:footer.link.dataset', 'Dataset')}</a>
                  </Link>
                </li>
              </ul>
            </FooterMenu>
            <FooterMenu small={true}>
              <ul>
                <li>
                  <Link href="/terms-of-service">
                    {t('common:footer.link.tos', 'Terms of service')}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy">
                    {t('common:footer.link.privacy', 'Privacy policy')}
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/ambanum/OpenTermsArchive">
                    <a target="_blank">{t('common:footer.link.github', 'GitHub')}</a>
                  </Link>
                </li>
              </ul>
            </FooterMenu>
          </Footer>
        </Container>
      </Container>
    </>
  );
};

export default Layout;
