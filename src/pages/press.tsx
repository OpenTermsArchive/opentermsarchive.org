import { WithI18nResult, withI18n } from 'modules/I18n';

import Article from 'modules/Common/components/Article';
import Button from 'modules/Common/components/Button';
import Container from 'modules/Common/containers/Container';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
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
    </Layout>
  );
}

export const getStaticProps = withI18n({ load: 'mdx', filename: 'press' })();
