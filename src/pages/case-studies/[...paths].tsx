import type { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next';
import { WithMdxResult, getStaticFilesPaths, loadMdxFile } from 'modules/I18n/hoc/withMdx';

import Breadcrumb from 'components/BreadCrumb';
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
import { getCaseStudieSubtitle } from 'pages/case-studies';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

const FOLDER = 'pages';

export default function CaseStudyPage({ mdxContent }: WithMdxResult) {
  const { frontmatter = {} } = mdxContent || {};
  const { t } = useTranslation();
  const router = useRouter();

  //Breadcrumb items
  let breadcrumbItems = new Array();
  breadcrumbItems.push({
    name: t('case-studies:breadcrumb.title'),
    url: router.locale === 'fr' ? '/fr/case-studies' : '/case-studies',
  });
  breadcrumbItems.push({
    name: frontmatter.title,
  });

  return (
    <Layout
      title={frontmatter?.seo?.title || frontmatter?.title}
      desc={frontmatter?.seo?.description}
    >
      {frontmatter['hero.title'] && (
        <Container layout="wide" dark={true} paddingY={false}>
          <Container gridCols="12" gridGutters="11" flex={true} paddingX={false} dark={true}>
            <Hero title={frontmatter['hero.title']} subtitle={frontmatter['hero.subtitle']}></Hero>
          </Container>
        </Container>
      )}

      <Container layout="wide" gray={true} paddingY={false}>
        <Container gridCols="12" gridGutters="11" paddingYSmall={true}>
          <Breadcrumb items={breadcrumbItems} className="mb__0"></Breadcrumb>
        </Container>
      </Container>

      <Container paddingTop={false}>
        <Container
          gridCols={frontmatter['grid.cols'] || 10}
          gridGutters={frontmatter['grid.gutters'] || 9}
        >
          <TextContent>
            <h1 className="mb__S">{frontmatter.title}</h1>

            <h4 className="h4__ultralight mb__3XL">
              {getCaseStudieSubtitle(frontmatter.service, frontmatter.documents, frontmatter.dates)}
            </h4>

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
      </Container>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  return {
    paths: (locales || []).reduce(
      (acc, locale) => [
        ...acc,
        ...getStaticFilesPaths(FOLDER, locale, 'case-studies').map((filename) => ({
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
      subfolder: 'case-studies',
    },
    props.locale
  );

  if (!mdxFile) {
    return { notFound: true };
  }

  return { props: { ...mdxFile } };
};
