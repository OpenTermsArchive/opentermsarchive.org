import withMdx, { WithMdxResult } from 'modules/I18n/hoc/withMdx';
import Container from 'modules/Common/containers/Container';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import LinkIcon from 'modules/Common/components/LinkIcon';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import useTranslation from 'next-translate/useTranslation';

export default function CaseStudiesPage({ mdxContent }: WithMdxResult) {
  const { t } = useTranslation();
  return (
    <Layout title={t('case-studies:seo.title')}>
      <Container layout="wide" dark={true} paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Hero
            title={t('case-studies:hero.title')}
            subtitle={t('case-studies:hero.subtitle')}
          ></Hero>
        </Container>
      </Container>

      <Container gridCols="9" gridGutters="8">
        <TextContent>
          {mdxContent && <MDXRemote {...mdxContent} components={{ LinkIcon }} />}
        </TextContent>
      </Container>
    </Layout>
  );
}

export const getStaticProps = withMdx({
  load: 'mdx',
  filename: 'case-studies',
  folder: 'parts',
})();
