import { FiGithub, FiMail, FiTwitter } from 'react-icons/fi';
import React, { ReactNode } from 'react';

import { Analytics } from 'modules/Analytics';
import Container from './Container';
import Divider from '../components/Divider';
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
            {({ toggleExtended }) => (
              <>
                <HeaderMenu>
                  <ul>
                    <li>
                      <Link href="/">
                        <a
                          title={t('header:link.home.title', 'Back to home page')}
                          onClick={toggleExtended}
                        >
                          {t('header:link.home', 'Home')}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href={'/case-studies'}>
                        <a onClick={toggleExtended} title={t('header:link.case-studies.title')}>
                          {t('header:link.case-studies', 'Case studies')}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href={'/about'}>
                        <a onClick={toggleExtended} title={t('header:link.about.title')}>
                          {t('header:link.about', 'About')}
                        </a>
                      </Link>
                    </li>
                  </ul>
                </HeaderMenu>
                <HeaderMenu type="secondary">
                  <LanguageSwitcher />
                  <ul>
                    <li>
                      <Link href="https://twitter.com/OpenTerms">
                        <a
                          className={classNames('icon_circle')}
                          target="_blank"
                          title={t('header:link.twitter.title', 'Follow us')}
                        >
                          <FiTwitter color="#fefffd" />
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://github.com/ambanum/OpenTermsArchive/">
                        <a
                          className={classNames('icon_circle')}
                          target="_blank"
                          title={t('header:link.github.title', 'See the source code')}
                        >
                          <FiGithub color="#fefffd" />
                        </a>
                      </Link>
                    </li>
                  </ul>
                </HeaderMenu>
              </>
            )}
          </Header>
        </Container>
      </Container>

      {children}

      {/* Footer */}
      <Container paddingY={false} gray={true} layout="fluid" paddingX={false}>
        <Divider />
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
                  <Link href="/">{t('footer:link.home', 'Home')}</Link>
                </li>
                <li>
                  <Link href={'/contribute'}>{t('footer:link.contribute', 'Contribute')}</Link>
                </li>
                <li>
                  <Link href={'/case-studies'}>
                    <a title={t('footer:link.case-studies.title')}>
                      {t('footer:link.case-studies')}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={'/about'}>À propos</Link>
                </li>
                <li>
                  <Link href={'/media'}>Média</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link href="https://twitter.com/OpenTerms">
                    <a
                      target="_blank"
                      title={t('footer:link.twitter.title', 'Follow us on Twitter')}
                      className={classNames('a_icontext', 'a__small', 'footer_menus_icontext')}
                    >
                      <span className={classNames('icon_circle', 'icon_circle__medium', 'mr__2XS')}>
                        <FiTwitter color="#fefffd" />
                      </span>
                      <span>{t('footer:link.twitter', 'Follow us')}</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="mailto:contact@opentermsarchive.org">
                    <a
                      title={t('footer:link.contact.title', 'Contact us by mail')}
                      className={classNames('a_icontext', 'a__small', 'footer_menus_icontext')}
                    >
                      <span className={classNames('icon_circle', 'icon_circle__medium', 'mr__2XS')}>
                        <FiMail color="#fefffd" />
                      </span>
                      <span>{t('footer:link.contact', 'Contact us')}</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </FooterMenu>
            <FooterMenu small={true} align={'right'}>
              <ul>
                <li>
                  <Link href="/legal-notice">
                    <a
                      title={t(
                        'footer:link.tos.title',
                        'Read the legal notice of Open Terms Archive website'
                      )}
                    >
                      {t('footer:link.tos', 'Legal notice')}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy">
                    <a
                      title={t(
                        'footer:link.privacy.title',
                        'Read the privacy policy of Open Terms Archive website'
                      )}
                    >
                      {t('footer:link.privacy', 'Privacy policy')}
                    </a>
                  </Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link href="/dashboard">
                    <a title={t('footer:link.dashboard.title', 'A set of activity metrics')}>
                      {t('footer:link.dashboard', 'Dashboard')}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="https://opentermsarchive.org/data/api">
                    <a title={t('footer:link.api.title', 'Use the API')}>
                      {t('footer:link.api', 'API')}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/ambanum/OpenTermsArchive-versions/releases">
                    <a
                      title={t('footer:link.dataset.title', 'Download the dataset')}
                      target="_blank"
                    >
                      Jeu de donnée
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/ambanum/OpenTermsArchive">
                    <a
                      title={t('footer:link.github.title', 'Go to the GitHub repository')}
                      target="_blank"
                    >
                      Code Source
                    </a>
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
