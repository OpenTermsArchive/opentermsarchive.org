import { WithMdxResult, loadMdxFile, getStaticFilesPaths } from 'modules/I18n/hoc/withMdx';
import Button from 'modules/Common/components/Button';
import Container from 'modules/Common/containers/Container';
import Layout from 'modules/Common/containers/Layout';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import type { GetStaticPaths, GetStaticProps, GetStaticPathsResult } from 'next';
import TextContent from 'modules/Common/components/TextContent';

const FOLDER = 'static';

export default function PrivacyPolicyPage({ mdxContent }: WithMdxResult) {
  const { frontmatter } = mdxContent || {};

  return (
    <Layout title={frontmatter?.title} desc={frontmatter?.description}>
      <Container gridCols="10" gridGutters="9">
        <TextContent>
          {mdxContent && <MDXRemote {...mdxContent} components={{ Button }} />}
        </TextContent>
      </Container>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  return {
    paths: (locales || []).reduce(
      (acc, locale) => [
        ...acc,
        ...getStaticFilesPaths(FOLDER, locale).map((filename) => ({
          params: {
            paths: [filename.replace('.mdx', '')],
          },
          locale,
        })),
      ],
      [] as GetStaticPathsResult['paths']
    ),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (props) => {
  const mdxFile = await loadMdxFile(
    {
      load: 'mdx',
      filename: (props?.params?.paths as string[]).join('/'),
      folder: FOLDER,
    },
    props.locale
  );

  if (!mdxFile) {
    return { notFound: true };
  }

  return { props: { ...mdxFile } };
};
