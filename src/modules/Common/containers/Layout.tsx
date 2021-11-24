import { FiGithub, FiMail, FiTwitter } from 'react-icons/fi';
import React, { ReactNode } from 'react';

import { Analytics } from 'modules/Analytics';
import Container from './Container';
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
  const { t } = useTranslation('common');
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
                          title={t('header.link.home.title', { ns: 'common' })}
                          onClick={toggleExtended}
                        >
                          {t('header.link.home', { ns: 'common' })}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/how-it-works">
                        <a
                          title={t('header.link.how.title', { ns: 'common' })}
                          onClick={toggleExtended}
                        >
                          {t('header.link.how', { ns: 'common' })}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/contribute">
                        <a
                          title={t('header.link.adddocument.title', { ns: 'common' })}
                          onClick={toggleExtended}
                        >
                          {t('header.link.adddocument', { ns: 'common' })}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href={'/case-studies'}>
                        <a
                          onClick={toggleExtended}
                          title={t('header.link.case-studies.title', { ns: 'common' })}
                        >
                          {t('header.link.case-studies', { ns: 'common' })}
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
                          title={t('header.link.twitter.title', { ns: 'common' })}
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
                          title={t('header.link.github.title', { ns: 'common' })}
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
                  <Link href="/">{t('footer.link.home', { ns: 'common' })}</Link>
                </li>
                <li>
                  <Link href="how-it-works">{t('footer.link.how', { ns: 'common' })}</Link>
                </li>
                <li>
                  <Link href={'/#'.concat(t('values.id', { ns: 'common' }))}>
                    {t('footer.link.values', { ns: 'common' })}
                  </Link>
                </li>
                <li>
                  <Link href={'/#'.concat(t('contribute.id', { ns: 'common' }))}>
                    {t('footer.link.contribute', { ns: 'common' })}
                  </Link>
                </li>
                <li>
                  <Link href={'/#'.concat(t('showcase.id', { ns: 'common' }))}>
                    {t('footer.link.showcase', { ns: 'common' })}
                  </Link>
                </li>
                <li>
                  <Link href={'/case-studies'}>
                    <a title={t('footer.link.case-studies.title', { ns: 'common' })}>
                      {t('footer.link.case-studies', { ns: 'common' })}
                    </a>
                  </Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link href="https://twitter.com/OpenTerms">
                    <a
                      target="_blank"
                      title={t('footer.link.twitter.title', { ns: 'common' })}
                      className={classNames('a_icontext', 'a__small', 'footer_menus_icontext')}
                    >
                      <span className={classNames('icon_circle', 'icon_circle__medium', 'mr__2XS')}>
                        <FiTwitter color="#fefffd" />
                      </span>
                      <span>{t('footer.link.twitter', { ns: 'common' })}</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={'mailto:' + t('contact.email', { ns: 'common' })}>
                    <a
                      title={t('footer.link.contact.title', { ns: 'common' })}
                      className={classNames('a_icontext', 'a__small', 'footer_menus_icontext')}
                    >
                      <span className={classNames('icon_circle', 'icon_circle__medium', 'mr__2XS')}>
                        <FiMail color="#fefffd" />
                      </span>
                      <span>{t('footer.link.contact', { ns: 'common' })}</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </FooterMenu>
            <FooterMenu small={true} align={'right'}>
              <ul>
                <li>
                  <Link href="/media">
                    <a title={t('footer.link.media.title', { ns: 'common' })}>
                      {t('footer.link.media', { ns: 'common' })}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/legal-notice">
                    <a title={t('footer.link.tos.title', { ns: 'common' })}>
                      {t('footer.link.tos', { ns: 'common' })}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy">
                    <a title={t('footer.link.privacy.title', { ns: 'common' })}>
                      {t('footer.link.privacy', { ns: 'common' })}
                    </a>
                  </Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link href="/dashboard">
                    <a title={t('footer.link.dashboard.title', { ns: 'common' })}>
                      {t('footer.link.dashboard', { ns: 'common' })}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="https://opentermsarchive.org/data/api">
                    <a title={t('footer.link.api.title', { ns: 'common' })}>
                      {t('footer.link.api', { ns: 'common' })}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/ambanum/OpenTermsArchive-versions/releases">
                    <a title={t('footer.link.dataset.title', { ns: 'common' })} target="_blank">
                      {t('footer.link.dataset', { ns: 'common' })}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/ambanum/OpenTermsArchive">
                    <a title={t('footer.link.github.title', { ns: 'common' })} target="_blank">
                      {t('footer.link.github', { ns: 'common' })}
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
