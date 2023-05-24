import { getI18nContentFilePaths, loadMdxFile } from 'modules/I18n/hoc/withMdx';

import Container from 'modules/Common/containers/Container';
import type { GetStaticProps } from 'next';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import { Link } from 'modules/I18n';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

interface CaseStudy {
  url: string;
  frontmatter: any;
}

export default function CaseStudiesPage({ caseStudiesMdx }: { caseStudiesMdx: CaseStudy[] }) {
  const { t } = useTranslation();

  // Sort by date
  caseStudiesMdx.sort((a: any, b: any) => {
    return Date.parse(b.frontmatter.dates[0]) - Date.parse(a.frontmatter.dates[0]);
  });

  return (
    <Layout title={t('case-studies:seo.title')} desc={t('case-studies:seo.desc')}>
      <Container layout="wide" dark={true} paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false} paddingY={false}>
          <Hero
            title={t('case-studies:hero.title')}
            subtitle={t('case-studies:hero.subtitle')}
          ></Hero>
        </Container>
      </Container>

      <Container paddingY={false}>
        <Container gridCols="10" gridGutters="9">
          <TextContent>
            {caseStudiesMdx.map(({ url, frontmatter }, i: number) => {
              const title = (
                <h4 className="mb__0">
                  <Link href={url}>{frontmatter.title}</Link>
                </h4>
              );
              const subtitle = (
                <div className="text__smallcaps mt__2XS">
                  {getCaseStudySubtitle(
                    frontmatter.service,
                    frontmatter.terms_types,
                    frontmatter.dates
                  )}
                </div>
              );
              const separator = caseStudiesMdx.length - 1 === i ? '' : <hr className="mt__XL" />;

              return (
                <div key={frontmatter.title} className="mb__XL">
                  {title}
                  {subtitle}
                  {separator}
                </div>
              );
            })}
          </TextContent>
        </Container>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (props) => {
  const locale = props.locale || 'en';
  const { files: caseStudiesFilesPath } = getI18nContentFilePaths('pages', locale, {
    subfolder: 'case-studies',
    extension: false,
  });

  const caseStudiesMdx: CaseStudy[] = [];

  await Promise.all(
    caseStudiesFilesPath.map(async (filename) => {
      const mdxContent = await loadMdxFile(
        {
          filename,
          folder: `pages`,
        },
        locale
      );
      caseStudiesMdx.push({ url: `/${filename}`, frontmatter: mdxContent?.frontmatter || {} });
    })
  );

  return {
    props: {
      caseStudiesMdx,
      ...props,
    },
  };
};

export function getCaseStudySubtitle(service: string, termsTypes: [], dates: []) {
  const router = useRouter();
  dates.sort((date1, date2) => date1 - date2);
  // @ts-ignore
  const formatter = new Intl.DateTimeFormat(router.locale, { dateStyle: 'long' });
  const displayDates = dates.map((date) => formatter.format(new Date(date))).join(' - ');
  const separator = ` ▪ `;
  return `${service}${separator}${termsTypes.join(', ')}${separator}${displayDates}`;
}
