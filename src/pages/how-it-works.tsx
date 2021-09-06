import { WithI18nResult, withI18n } from 'modules/I18n';

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

export default function HowItWorksPage({ mdxContent }: WithI18nResult) {
  const { t } = useTranslation('common');
  return (
    <Layout title={t('common:how-it-works.seo.title', 'How Open Terms Archive works ?')}>
      <Container layout="wide" backgroundImage="/images/bg1.jpg" dark={true} paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Column width={70}>
            <Hero
              title={t('common:how-it-works.hero.title', 'How it works')}
              subtitle={t(
                'common:how-it-works.hero.subtitle',
                'The platform undertakes to aggregate, in a centralised manner, as many contractual documents in as many languages as possible.'
              )}
            ></Hero>
          </Column>
          <Column width={30}>
            <img src="/images/how.png" loading="lazy" />
          </Column>
        </Container>
      </Container>
      <Container gridCols="9" gridGutters="8">
        <TextContent>
          <MDXRemote {...(mdxContent as any)} components={{ Button: Button, Link: Link }} />
        </TextContent>
      </Container>
    </Layout>
  );
}

export const getStaticProps = withI18n({ load: 'mdx', filename: 'how-it-works' })();
