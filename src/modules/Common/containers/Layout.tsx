import { HiMail as IconMailFill } from 'react-icons/hi';
import { SiMastodon as IconMastodonFill, SiTwitter as IconTwitterFill } from 'react-icons/si';
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
import { Link } from 'modules/I18n';
import classNames from 'classnames';
import { useTranslation } from 'modules/I18n';

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
      <CommonHead title={title} description={desc} image="/images/open-graph-image.png" />

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
                      <Link href="/" title={t('header:link.home.title')} onClick={toggleExtended}>
                        {t('header:link.home')}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={'/datasets'}
                        onClick={toggleExtended}
                        title={t('header:link.datasets.title')}
                      >
                        {t('header:link.datasets')}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://docs.opentermsarchive.org"
                        onClick={toggleExtended}
                        title={t('header:link.docs.title')}
                      >
                        {t('header:link.docs')}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={'/impact'}
                        onClick={toggleExtended}
                        title={t('header:link.impact.title')}
                      >
                        {t('header:link.impact')}
                      </Link>
                    </li>
                    <li>
                      <Link href={'/about'} onClick={toggleExtended}>
                        {t('header:link.about')}
                      </Link>
                    </li>
                  </ul>
                </HeaderMenu>
                <HeaderMenu type="secondary">
                  <LanguageSwitcher />
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
                  <Link href={'/datasets'}>{t('footer:link.datasets')}</Link>
                </li>
                <li>
                  <Link href="https://docs.opentermsarchive.org">{t('footer:link.docs')}</Link>
                </li>
                <li>
                  <Link href={'/impact'}>{t('footer:link.impact')}</Link>
                </li>
                <li>
                  <Link href={'/about'}>{t('footer:link.about')}</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link
                    href="https://mastodon.lescommuns.org/@opentermsarchive"
                    target="_blank"
                    rel="me"
                    title={t('footer:link.mastodon.title')}
                    className={classNames('a_icontext', 'a__small', 'footer_menus_icontext')}
                  >
                    <span className={classNames('icon_circle', 'icon_circle__medium', 'mr__2XS')}>
                      <IconMastodonFill color="#fefffd" />
                    </span>
                    <span>{t('footer:link.mastodon')}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://twitter.com/OpenTerms"
                    target="_blank"
                    rel="noopener"
                    title={t('footer:link.twitter.title')}
                    className={classNames('a_icontext', 'a__small', 'footer_menus_icontext')}
                  >
                    <span className={classNames('icon_circle', 'icon_circle__medium', 'mr__2XS')}>
                      <IconTwitterFill color="#fefffd" />
                    </span>
                    <span>{t('footer:link.twitter')}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:contact@opentermsarchive.org"
                    title={t('footer:link.contact.title')}
                    className={classNames('a_icontext', 'a__small', 'footer_menus_icontext')}
                  >
                    <span className={classNames('icon_circle', 'icon_circle__medium', 'mr__2XS')}>
                      <IconMailFill color="#fefffd" />
                    </span>
                    <span>{t('footer:link.contact')}</span>
                  </Link>
                </li>
              </ul>
            </FooterMenu>
            <FooterMenu small={true} align={'right'}>
              <ul>
                <li>
                  <Link href="/media">{t('footer:link.media')}</Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/OpenTermsArchive/"
                    title={t('footer:link.github.title')}
                    target="_blank"
                    rel="noopener"
                  >
                    {t('footer:link.github')}
                  </Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link href="/legal-notice" title={t('footer:link.tos.title')}>
                    {t('footer:link.tos')}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" title={t('footer:link.privacy.title')}>
                    {t('footer:link.privacy')}
                  </Link>
                </li>
                <li>
                  <Link href="/accessibility" title={t('footer:link.accessibility.title')}>
                    {t('footer:link.accessibility')}
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
