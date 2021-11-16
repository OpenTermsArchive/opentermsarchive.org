import { WithI18nResult, withI18n } from 'modules/I18n';

import Article from 'modules/Common/components/Article';
import Button from 'modules/Common/components/Button';
import Column from 'modules/Common/components/Column';
import Container from 'modules/Common/containers/Container';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import { useTranslation } from 'next-i18next';

export default function PressPage({ mdxContent }: WithI18nResult) {
  const { t } = useTranslation('common');
  return (
    <Layout title={t('common:press.seo.title', 'Press')}>
      {/* Hero with title and subtitle, without image background, no darked */}
      <Container layout="wide" paddingY={false} gray={true}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Hero
            title={t('common:press.hero.title', 'Press')}
            subtitle={t('common:press.hero.subtitle', 'They talk about the Open Terms Archive')}
          ></Hero>
        </Container>
      </Container>
      <Container gridCols="10" gridGutters="11" flex={true}>
        <Article>
          <TextContent>
            <MDXRemote {...(mdxContent as any)} components={{ Button: Button }} />
          </TextContent>
        </Article>
      </Container>
      <Container layout="wide" paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false} dark={true}>
          <Column
            width={100}
            title={t('common:press.getintouch.title', 'Would you like to get in touch with us?')}
            subtitle={t('common:press.getintouch.subtitle', 'You are journalist')}
            className="tcenter"
          >
            <TextContent>
              <p>
                {t('common:press.getintouch.p1', 'Contact us by email:')}{' '}
                <Link href="mailto:contact@opentermsarchive.org">
                  <a className="a__darked">contact@opentermsarchive.org</a>
                </Link>
              </p>
              <p>
                {t('common:press.getintouch.p2', 'Be free to')}{' '}
                <Link href="/download/press-kit/20210719-open-terms-archive-press-kit.zip">
                  <a download className="a__darked">
                    {t('common:press.getintouch.presskitlink.label', 'download the press kit')}
                  </a>
                </Link>
              </p>
            </TextContent>
          </Column>
        </Container>
      </Container>
    </Layout>
  );
}

export const getStaticProps = withI18n({ load: 'mdx', filename: 'press' })();
