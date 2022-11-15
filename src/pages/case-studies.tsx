import { getStaticFilesPaths, loadMdxFile } from 'modules/I18n/hoc/withMdx';

import Container from 'modules/Common/containers/Container';
import type { GetStaticProps } from 'next';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import Link from 'next/link';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import dayjs from 'dayjs';
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

      <Container gridCols="10" gridGutters="9">
        <TextContent>
          {caseStudiesMdx.map(({ mdxContent }) => {
            const slug = slugify(mdxContent.frontmatter.title, {
              lower: true,
              strict: true,
            });
            const href = `${router.locale}/case-studies/${slug}`;

            //Map dates by years-months
            let orderedDates = new Map();
            mdxContent.frontmatter.dates.forEach((date: string) => {
              const yearsMonths = dayjs(date).format('YYYY-MM');
              const day = dayjs(date).format('DD');
              let yearMonthsGroup = orderedDates.get(yearsMonths) ?? [];
              yearMonthsGroup.push(day);
              orderedDates.set(yearsMonths, yearMonthsGroup);
            });

            //Create dates to display
            let displayDates = new Array();
            orderedDates.forEach((days, yearsMonths) => {
              const year = dayjs(yearsMonths.toString()).format('YYYY');
              let month = dayjs(yearsMonths.toString()).format('MMMM');
              let displayDate = `${month} ${days}, ${year}`;
              if (router.locale === 'fr') {
                month = dayjs(yearsMonths.toString()).locale('fr').format('MMMM');
                displayDate = `${days} ${month} ${year}`;
              }
              displayDates.push(displayDate);
            });

            return (
              <div key={mdxContent.frontmatter.title} className="mb__XL">
                <h4 className="mb__0">
                  <Link href={href}>{mdxContent.frontmatter.title}</Link>
                </h4>
                <div className="text__smallcaps mt__2XS">
                  {mdxContent.frontmatter.service} ▪{' '}
                  {mdxContent.frontmatter.documents.map((document: string, i: number) => {
                    if (i === mdxContent.frontmatter.documents.length - 1) {
                      return document;
                    }
                    return `${document}, `;
                  })}{' '}
                  ▪{' '}
                  {displayDates.map((displayDate: string, i: number) => {
                    if (i === displayDates.length - 1) {
                      return displayDate;
                    }
                    return `${displayDate} - `;
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
