import Container from 'modules/Common/containers/Container';
import Layout from 'modules/Common/containers/Layout';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import Collections from 'modules/Common/components/Collections';
import withMdx, { WithMdxResult } from 'modules/I18n/hoc/withMdx';
import { MDXRemote } from 'next-mdx-remote';

export default function DatasetsPage({ mdxContent }: WithMdxResult) {
  const { frontmatter = {} } = mdxContent || {};
  return (
    <Layout
      title={frontmatter['html_title'] ?? frontmatter['title'] ?? frontmatter['hero.title']}
      desc={frontmatter['html_description'] ?? frontmatter['hero.subtitle']}
    >
      <Container paddingTop={false}>
        <Container
          gridCols={frontmatter['grid.cols'] || 10}
          gridGutters={frontmatter['grid.gutters'] || 9}
          paddingBottom={false}
        >
          <TextContent>
            {frontmatter.title && <h1>{frontmatter.title}</h1>}
            <MDXRemote {...(mdxContent as any)} />
          </TextContent>
        </Container>
      </Container>
      <Container gray={false} layout="wide" paddingX={false} paddingTop={false} id="collections">
        <Container gridCols="12" gridGutters="11" paddingTop={false}>
          <Collections subtitleLevel="h5" withPlaceholder={false} />
        </Container>
      </Container>
    </Layout>
  );
}

export const getStaticProps = withMdx({ filename: 'datasets', folder: 'parts' })((props: any) => ({
  props: {
    ...props,
  },
}));
