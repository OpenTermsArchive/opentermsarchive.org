import type { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next';
import { WithMdxResult, getI18nContentFilePaths, loadMdxFile } from 'modules/I18n/hoc/withMdx';

import Breadcrumb from 'components/BreadCrumb';
import Button from 'modules/Common/components/Button';
import Column from 'modules/Common/components/Column';
import Container from 'modules/Common/containers/Container';
import Contributors from 'modules/OTA-api/data-components/Contributors';
import Hero from 'modules/Common/components/Hero';
import { FiTwitter as IconTwitter } from 'react-icons/fi';
import Layout from 'modules/Common/containers/Layout';
import { Link } from 'modules/I18n';
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

export default function StaticPage({ mdxContent }: WithMdxResult) {
  const { frontmatter = {} } = mdxContent || {};
  const { t } = useTranslation();
  const router = useRouter();

  const isCaseStudie = router.query.paths?.includes('case-studies');

  let breadcrumbItems = new Array();
  if (isCaseStudie) {
    //Breadcrumb items
    breadcrumbItems.push({
      name: t('case-studies:breadcrumb.title'),
      url: router.locale === 'fr' ? '/fr/case-studies' : '/case-studies',
    });
    breadcrumbItems.push({
      name: frontmatter.title,
    });
  }
  if (frontmatter.breadcrumb) {
    breadcrumbItems = frontmatter.breadcrumb;
  }

  return (
    <Layout
      title={frontmatter?.seo?.title || frontmatter['title']}
      desc={frontmatter['description']}
    >
      {frontmatter['hero.title'] && (
        <Container layout="wide" dark={true} paddingY={false}>
          <Container gridCols="12" gridGutters="11" flex={true} paddingX={false} dark={true}>
            <Hero title={frontmatter['hero.title']} subtitle={frontmatter['hero.subtitle']}></Hero>
          </Container>
        </Container>
      )}
      {(frontmatter.breadcrumb || isCaseStudie) && (
        <Container layout="wide" gray={true} paddingY={false}>
          <Container gridCols="12" gridGutters="11" paddingYSmall={true}>
            <Breadcrumb items={breadcrumbItems} className="mb__0"></Breadcrumb>
          </Container>
        </Container>
      )}

      <Container paddingTop={false}>
        <Container
          gridCols={frontmatter['grid.cols'] || 10}
          gridGutters={frontmatter['grid.gutters'] || 9}
        >
          <TextContent>
            {frontmatter.title && isCaseStudie ? (
              <h1 className="mb__S">{frontmatter.title}</h1>
            ) : (
              <h1>{frontmatter.title}</h1>
            )}

            {isCaseStudie && (
              <h4 className="h4__ultralight mb__3XL">
                {getCaseStudieSubtitle(
                  frontmatter.service,
                  frontmatter.documents,
                  frontmatter.dates
                )}
              </h4>
            )}
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
      {frontmatter.display_follow_us === true && (
        <Container layout="wide" paddingY={false} dark={true}>
          <Container gridCols="9" gridGutters="8" flex={true}>
            <Column width={40} alignX="center" alignY="center">
              <IconTwitter size="128" color="var(--colorBlack400)" strokeWidth="1px" />
            </Column>
            <Column width={60} subtitle={t('follow-us:title')}>
              <TextContent marginTop={false}>
                <p className="mt__M">{t('follow-us:desc')}</p>
                <Link href="https://twitter.com/OpenTerms">
                  <a target="_blank" rel="noopener">
                    <Button className="mb__0">{t('follow-us:button.label')}</Button>
                  </a>
                </Link>
              </TextContent>
            </Column>
          </Container>
        </Container>
      )}
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  return {
    paths: (locales || []).reduce(
      (acc, locale) => [
        ...acc,
        ...getI18nContentFilePaths(FOLDER, locale, { extension: false }).files.map((filename) => ({
          params: {
            paths: [filename],
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
  const mdxContent = await loadMdxFile(
    {
      filename: (props?.params?.paths as string[]).join('/'),
      folder: FOLDER,
    },
    props.locale
  );

  if (!mdxContent) {
    return { notFound: true };
  }

  return { props: { mdxContent } };
};
