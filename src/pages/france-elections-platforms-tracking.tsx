import { WithI18nResult, withI18n } from 'modules/I18n';

import Container from 'modules/Common/containers/Container';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import { useTranslation } from 'next-i18next';

export default function franceElectionsPlatformsTrackingPage({ mdxContent }: WithI18nResult) {
  const { t } = useTranslation();
  return (
    <Layout
      title={t('france-elections-platforms-tracking:seo.title')}
      desc={t('france-elections-platforms-tracking:seo.desc')}
    >
      <Container layout="wide" paddingY={false} dark={true}>
        <Container gridCols="12" gridGutters="11" paddingX={false} paddingY={false}>
          <Container gridCols="9" gridGutters="8" flex={true} paddingX={false} alignX="left">
            <Hero
              title={t('france-elections-platforms-tracking:hero.title')}
              subtitle={t('france-elections-platforms-tracking:hero.subtitle')}
            ></Hero>
          </Container>
        </Container>
      </Container>
      <Container gridCols="10" gridGutters="9">
        <TextContent>
          <MDXRemote {...(mdxContent as any)} />
        </TextContent>
      </Container>
    </Layout>
  );
}

export const getStaticProps = withI18n({
  load: 'mdx',
  filename: 'france-elections-platforms-tracking',
})();
