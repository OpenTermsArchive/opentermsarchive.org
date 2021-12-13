import { WithI18nResult, withI18n } from 'modules/I18n';

import Column from 'modules/Common/components/Column';
import Container from 'modules/Common/containers/Container';
import Hero from 'modules/Common/components/Hero';
import ImageCasestudies from '../../public/images/casestudies.svg';
import Layout from 'modules/Common/containers/Layout';
import LinkIcon from 'modules/Common/components/LinkIcon';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import { useTranslation } from 'next-i18next';

export default function CaseStudiesPage({ mdxContent }: WithI18nResult) {
  const { t } = useTranslation();
  return (
    <Layout title={t('case-studies:seo.title')}>
      <Container layout="wide" dark={true} paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Column width={60} alignY="center" mobileOrder={2}>
            <Hero
              title={t('case-studies:hero.title')}
              subtitle={t('case-studies:hero.subtitle')}
            ></Hero>
          </Column>
          <Column width={40} alignX="center" mobileOrder={1}>
            <ImageCasestudies />
          </Column>
        </Container>
      </Container>

      <Container gridCols="9" gridGutters="8">
        <TextContent>
          <MDXRemote {...(mdxContent as any)} components={{ LinkIcon: LinkIcon }} />
        </TextContent>
      </Container>
    </Layout>
  );
}

export const getStaticProps = withI18n({ load: 'mdx', filename: 'case-studies' })();
