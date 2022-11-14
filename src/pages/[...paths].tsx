import type { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next';
import { WithMdxResult, getStaticFilesPaths, loadMdxFile } from 'modules/I18n/hoc/withMdx';

import Button from 'modules/Common/components/Button';
import Container from 'modules/Common/containers/Container';
import Contributors from 'modules/OTA-api/data-components/Contributors';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import Link from 'next/link';
import LinkIcon from 'modules/Common/components/LinkIcon';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import ThumbGallery from 'modules/Common/components/ThumbGallery';
import ThumbGalleryItem from 'modules/Common/components/ThumbGalleryItem';

const FOLDER = 'pages';

export default function PrivacyPolicyPage({ mdxContent }: WithMdxResult) {
  const { frontmatter = {} } = mdxContent || {};

  return (
    <Layout title={frontmatter?.title} desc={frontmatter?.description}>
      {frontmatter['hero.title'] && (
        <Container layout="wide" dark={true} paddingY={false}>
          <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
            <Hero title={frontmatter['hero.title']} subtitle={frontmatter['hero.subtitle']}></Hero>
          </Container>
        </Container>
      )}

      <Container gridCols="10" gridGutters="9">
        <TextContent>
          {mdxContent && (
            <MDXRemote
              {...mdxContent}
              components={{
                Button,
                LinkIcon,
                Contributors,
                Link,
                ThumbGallery,
                ThumbGalleryItem,
              }}
            />
          )}
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
    fallback: 'blocking',
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
