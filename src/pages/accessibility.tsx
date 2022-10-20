import Button from 'modules/Common/components/Button';
import Container from 'modules/Common/containers/Container';
import Layout from 'modules/Common/containers/Layout';
import withMdx, { WithMdxResult } from 'modules/I18n/hoc/withMdx';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import useTranslation from 'next-translate/useTranslation';

export default function AccessibilityPage({ mdxContent }: WithMdxResult) {
  const { t } = useTranslation();

  return (
    <Layout title={t('accessibility:seo.title')}>
      <Container gridCols="10" gridGutters="9">
        <TextContent>
          <MDXRemote {...(mdxContent as any)} components={{ Button }} />
        </TextContent>
      </Container>
    </Layout>
  );
}

export const getStaticProps = withMdx({
  load: 'mdx',
  filename: 'accessibility',
  folder: 'static',
})();
