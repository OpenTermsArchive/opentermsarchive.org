import { FiGithub, FiMail, FiTwitter } from 'react-icons/fi';
import React, { ReactNode } from 'react';

import { Analytics } from 'modules/Analytics';
import CommonHead from './CommonHead';
import Container from './Container';
import Divider from '../components/Divider';
import Footer from './Footer';
import FooterMenu from '../components/FooterMenu';
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
      <CommonHead title={title} description={desc} twitterCard="/images/twitter-card.jpg" />

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
                        <a title={t('header:link.home.title')} onClick={toggleExtended}>
                          {t('header:link.home')}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href={'/case-studies'}>
                        <a onClick={toggleExtended} title={t('case-studies:hero.subtitle')}>
                          {t('header:link.case-studies')}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href={'/about'}>
                        <a onClick={toggleExtended} title={t('about:hero.subtitle')}>
                          {t('header:link.about')}
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
                          rel="noopener"
                          title={t('header:link.twitter.title')}
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
                          rel="noopener"
                          title={t('header:link.github.title')}
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
                  <Link href="/">{t('footer:link.home')}</Link>
                </li>
                <li>
                  <Link href={'/case-studies'}>{t('footer:link.case-studies')}</Link>
                </li>
                <li>
                  <Link href={'/about'}>{t('footer:link.about')}</Link>
                </li>
                <li>
                  <Link href={'/media'}>{t('footer:link.media')}</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link href="https://twitter.com/OpenTerms">
                    <a
                      target="_blank"
                      rel="noopener"
                      title={t('footer:link.twitter.title')}
                      className={classNames('a_icontext', 'a__small', 'footer_menus_icontext')}
                    >
                      <span className={classNames('icon_circle', 'icon_circle__medium', 'mr__2XS')}>
                        <FiTwitter color="#fefffd" />
                      </span>
                      <span>{t('footer:link.twitter')}</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="mailto:contact@opentermsarchive.org">
                    <a
                      title={t('footer:link.contact.title')}
                      className={classNames('a_icontext', 'a__small', 'footer_menus_icontext')}
                    >
                      <span className={classNames('icon_circle', 'icon_circle__medium', 'mr__2XS')}>
                        <FiMail color="#fefffd" />
                      </span>
                      <span>{t('footer:link.contact')}</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </FooterMenu>
            <FooterMenu small={true} align={'right'}>
              <ul>
                <li>
                  <Link href="/legal-notice">
                    <a title={t('footer:link.tos.title')}>{t('footer:link.tos')}</a>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy">
                    <a title={t('footer:link.privacy.title')}>{t('footer:link.privacy')}</a>
                  </Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link href="https://github.com/ambanum/OpenTermsArchive-versions/releases">
                    <a title={t('footer:link.dataset.title')} target="_blank" rel="noopener">
                      {t('footer:link.dataset')}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/ambanum/OpenTermsArchive">
                    <a title={t('footer:link.github.title')} target="_blank" rel="noopener">
                      {t('footer:link.github')}
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
