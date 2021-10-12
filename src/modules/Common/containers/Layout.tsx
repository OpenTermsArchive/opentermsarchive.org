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
                          title={t('common:header.link.home.title', 'Back to the home page')}
                          onClick={toggleExtended}
                        >
                          {t('common:header.link.home', 'Home')}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/how-it-works">
                        <a
                          title={t(
                            'common:header.link.how.title',
                            'How does Open Terms Archive work?'
                          )}
                          onClick={toggleExtended}
                        >
                          {t('common:header.link.how', 'How it works?')}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/contribute">
                        <a
                          title={t(
                            'common:header.link.adddocument.title',
                            'Add a document to Open Terms Archive'
                          )}
                          onClick={toggleExtended}
                        >
                          {t('common:header.link.adddocument', 'Add a document')}
                        </a>
                      </Link>
                    </li>
                    {/* <li>
                      <Link href={'/#'.concat(t('common:home_page.values.id'))}>
                        <a
                          title={t('common:header.link.values.title', 'What we believe in')}
                          onClick={toggleExtended}
                        >
                          {t('common:header.link.values', 'Values')}
                        </a>
                      </Link>
                    </li> */}
                    {/* <li>
                      <Link href={'/#'.concat(t('common:home_page.contribute.id'))}>
                        <a
                          title={t(
                            'common:header.link.contribute.title',
                            'Help us appreciate the loyalty of the services.'
                          )}
                          onClick={toggleExtended}
                        >
                          {t('common:header.link.contribute', 'Contribute')}
                        </a>
                      </Link>
                    </li> */}
                    {/* <li>
                      <Link href={'/#'.concat(t('common:home_page.showcase.id'))}>
                        <a
                          title={t(
                            'common:header.link.showcase.title',
                            'Applications built with Open Terms Archive'
                          )}
                          onClick={toggleExtended}
                        >
                          {t('common:header.link.showcase', 'Built with')}
                        </a>
                      </Link>
                    </li> */}
                    <li>
                      <Link href={'/case-studies'}>
                        <a
                          onClick={toggleExtended}
                          title={t(
                            'common:header.link.case-studies.title',
                            'So far, Open Terms Archive taught us a lot.'
                          )}
                        >
                          {t('common:header.link.case-studies', 'Case studies')}
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
                          title={t('common:header.link.twitter.title', 'Follow us')}
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
                          title={t('common:header.link.github.title', 'See the source code')}
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
                  <Link href="/">{t('common:footer.link.home', 'Home')}</Link>
                </li>
                <li>
                  <Link href="how-it-works">{t('common:footer.link.how', 'How')}</Link>
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
                  <Link href={'/case-studies'}>
                    <a
                      title={t(
                        'common:footer.link.case-studies.title',
                        'So far, Open Terms Archive taught us a lot.'
                      )}
                    >
                      {t('common:footer.link.case-studies', 'Case studies')}
                    </a>
                  </Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link href="https://twitter.com/OpenTerms">
                    <a
                      target="_blank"
                      title={t('common:footer.link.twitter.title', 'Follow us on Twitter')}
                      className={classNames('a_icontext', 'a__small', 'footer_menus_icontext')}
                    >
                      <span className={classNames('icon_circle', 'icon_circle__medium', 'mr__2XS')}>
                        <FiTwitter color="#fefffd" />
                      </span>
                      <span>{t('common:footer.link.twitter', 'Follow us')}</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="mailto:contact@opentermsarchive.org">
                    <a
                      title={t('common:footer.link.contact.title', 'Contact us by mail')}
                      className={classNames('a_icontext', 'a__small', 'footer_menus_icontext')}
                    >
                      <span className={classNames('icon_circle', 'icon_circle__medium', 'mr__2XS')}>
                        <FiMail color="#fefffd" />
                      </span>
                      <span>{t('common:footer.link.contact', 'Contact us')}</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </FooterMenu>
            <FooterMenu small={true} align={'right'}>
              <ul>
                <li>
                  <Link href="/press">
                    <a
                      title={t(
                        'common:footer.link.press.title',
                        'They talk about Open Terms Archive'
                      )}
                    >
                      {t('common:footer.link.press', 'Press')}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service">
                    <a
                      title={t(
                        'common:footer.link.tos.title',
                        'Read the TOS of Open Terms Archive website'
                      )}
                    >
                      {t('common:footer.link.tos', 'Terms of service')}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy">
                    <a
                      title={t(
                        'common:footer.link.privacy.title',
                        'Read the privacy policy of Open Terms Archive website'
                      )}
                    >
                      {t('common:footer.link.privacy', 'Privacy policy')}
                    </a>
                  </Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link href="https://disinfo.quaidorsay.fr/api/open-terms-archive/docs">
                    <a title={t('common:footer.link.api.title', 'Use the API')}>
                      {t('common:footer.link.api', 'API')}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/ambanum/OpenTermsArchive-versions/releases">
                    <a
                      title={t('common:footer.link.dataset.title', 'Download the dataset')}
                      target="_blank"
                    >
                      {t('common:footer.link.dataset', 'Dataset')}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/ambanum/OpenTermsArchive">
                    <a
                      title={t('common:footer.link.github.title', 'Go to the GitHub repository')}
                      target="_blank"
                    >
                      {t('common:footer.link.github', 'GitHub')}
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
