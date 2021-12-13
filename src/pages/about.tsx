import { WithI18nResult, withI18n } from 'modules/I18n';

import Container from 'modules/Common/containers/Container';
import Contributors from 'modules/OTA-api/data-components/Contributors';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import ThumbGalery from 'modules/Common/components/ThumbGalery';
import ThumbGaleryItem from 'modules/Common/components/ThumbGaleryItem';
import { useTranslation } from 'next-i18next';

export default function AboutPage({ mdxContent }: WithI18nResult) {
  const { t } = useTranslation();
  return (
    <Layout title={t('about:seo.title')} desc={t('about:seo.desc')}>
      <Container layout="wide" paddingY={false} dark={true}>
        <Container gridCols="12" gridGutters="11" paddingX={false} paddingY={false}>
          <Container gridCols="9" gridGutters="8" flex={true} paddingX={false} alignX="left">
            <Hero title={t('about:hero.title')} subtitle={t('about:hero.subtitle')}></Hero>
          </Container>
        </Container>
      </Container>
      <Container gridCols="10" gridGutters="9">
        <TextContent>
          <MDXRemote
            {...(mdxContent as any)}
            components={{
              Contributors: Contributors,
              Link: Link,
              ThumbGalery: ThumbGalery,
              ThumbGaleryItem: ThumbGaleryItem,
            }}
          />
        </TextContent>
      </Container>
    </Layout>
  );
}

export const getStaticProps = withI18n({ load: 'mdx', filename: 'about' })();
