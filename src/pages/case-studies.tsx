import { getStaticFilesPaths, loadMdxFile } from 'modules/I18n/hoc/withMdx';

import Container from 'modules/Common/containers/Container';
import type { GetStaticProps } from 'next';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import Link from 'next/link';
import LinkIcon from 'modules/Common/components/LinkIcon';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import { copySync } from 'fs-extra';
import slugify from 'slugify';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

export default function CaseStudiesPage({ caseStudiesMdx }: any) {
  const { t } = useTranslation();
  const router = useRouter();

  caseStudiesMdx.sort((a: any, b: any) => {
    return (
      Date.parse(b.mdxContent.frontmatter.dates[0]) - Date.parse(a.mdxContent.frontmatter.dates[0])
    );
  });

  return (
    <Layout title={t('case-studies:seo.title')} desc={t('case-studies:seo.desc')}>
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
          {caseStudiesMdx.map(({ mdxContent }) => {
            const slug = slugify(mdxContent.frontmatter.title, {
              lower: true,
              strict: true,
            });
            const href = `${router.locale}/case-studies/${slug}`;
            return (
              <div key={mdxContent.frontmatter.title} class="mb__XL">
                <h5 class="mb__0">
                  <Link href={href}>{mdxContent.frontmatter.title}</Link>
                </h5>
                <div class="text__smallcaps">
                  {mdxContent.frontmatter.service} ▪{' '}
                  {mdxContent.frontmatter.documents.map((document: string, i: number) => {
                    if (i === mdxContent.frontmatter.documents.length - 1) {
                      return document;
                    }
                    return `${document}, `;
                  })}{' '}
                  ▪{' '}
                  {mdxContent.frontmatter.dates.map((date: string, i: number) => {
                    const formatedDate = new Intl.DateTimeFormat(router.locale, {
                      dateStyle: 'long',
                    }).format(Date.parse(date));
                    if (i === mdxContent.frontmatter.dates.length - 1) {
                      return formatedDate;
                    }
                    return `${formatedDate}, `;
                  })}
                </div>
              </div>
            );
          })}
        </TextContent>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (props) => {
  const locale = props.locale || 'en';
  const casestudiesFilesPath = getStaticFilesPaths('pages', locale, 'case-studies');

  const caseStudiesMdx: any = [];
  casestudiesFilesPath.map(async (filename) => {
    const mdxFile = await loadMdxFile(
      {
        load: 'mdx',
        filename: `case-studies/${filename.replace('.mdx', '')}`,
        folder: `pages`,
      },
      locale
    );
    caseStudiesMdx.push(mdxFile);
  });

  return {
    props: {
      caseStudiesMdx,
      ...props,
    },
  };
};
