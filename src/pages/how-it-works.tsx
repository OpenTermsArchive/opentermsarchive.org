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
  const { t } = useTranslation(['common', 'how-it-works']);
  return (
    <Layout title={t('seo.title', { ns: 'how-it-works' })}>
      <Container layout="wide" dark={true} paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Column width={70}>
            <Hero
              title={t('hero.title', { ns: 'how-it-works' })}
              subtitle={t('hero.subtitle', { ns: 'how-it-works' })}
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
