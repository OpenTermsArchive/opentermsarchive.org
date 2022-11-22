import type { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next';
import { WithMdxResult, getI18nContentFilePaths, loadMdxFile } from 'modules/I18n/hoc/withMdx';

import BreadCrumb from 'components/BreadCrumb';
import Button from 'modules/Common/components/Button';
import Container from 'modules/Common/containers/Container';
import Contributors from 'modules/OTA-api/data-components/Contributors';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import { Link } from 'modules/I18n';
import LinkIcon from 'modules/Common/components/LinkIcon';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import ThumbGallery from 'modules/Common/components/ThumbGallery';
import ThumbGalleryItem from 'modules/Common/components/ThumbGalleryItem';
import { getCaseStudySubtitle } from 'pages/case-studies';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

const STATIC_PAGES_PATH = 'pages';

export default function CaseStudyPage({ mdxContent }: WithMdxResult) {
  const { frontmatter = {} } = mdxContent || {};
  const { t } = useTranslation();
  const router = useRouter();

  //BreadCrumb items
  let breadcrumbItems = new Array();
  breadcrumbItems.push({
    name: t('case-studies:breadcrumb.title'),
    url: router.locale === 'fr' ? '/fr/case-studies' : '/case-studies',
  });
  breadcrumbItems.push({
    name: frontmatter.title,
  });

  return (
    <Layout title={frontmatter['title']} desc={frontmatter['description']}>
      {frontmatter['hero.title'] && (
        <Container layout="wide" dark={true} paddingY={false}>
          <Container gridCols="12" gridGutters="11" flex={true} paddingX={false} dark={true}>
            <Hero title={frontmatter['hero.title']} subtitle={frontmatter['hero.subtitle']}></Hero>
          </Container>
        </Container>
      )}

      <Container layout="wide" gray={true} paddingY={false}>
        <Container gridCols="12" gridGutters="11" paddingYSmall={true}>
          <BreadCrumb items={breadcrumbItems} className="mb__0"></BreadCrumb>
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
              {getCaseStudySubtitle(
                frontmatter.service,
                frontmatter.terms_types,
                frontmatter.dates
              )}
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
        ...getI18nContentFilePaths(STATIC_PAGES_PATH, locale, {
          subfolder: 'case-studies',
          extension: false,
        }).files.map((filename) => ({
          params: {
            paths: [filename.replace('case-studies/', '')],
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
      filename: `case-studies/${(props?.params?.paths as string[]).join('/')}`,
      folder: STATIC_PAGES_PATH,
    },
    props.locale
  );

  if (!mdxFile) {
    return { notFound: true };
  }

  return { props: { mdxContent: mdxFile } };
};
