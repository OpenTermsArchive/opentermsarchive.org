import { WithI18nResult, withI18n } from 'modules/I18n';

import Container from 'modules/Common/containers/Container';
import Layout from 'modules/Common/containers/Layout';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';

export default function TermsOfServicePage({ mdxContent }: WithI18nResult) {
  return (
    <Layout>
      <Container gridCols="12" gridGutters="11" paddingX={false}>
        <MDXRemote {...(mdxContent as any)} components={{}} />
      </Container>
    </Layout>
  );
}

export const getStaticProps = withI18n({ load: 'mdx' })();
