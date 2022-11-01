import Container from 'modules/Common/containers/Container';
import Contributors from 'modules/OTA-api/data-components/Contributors';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import Link from 'next/link';
import withMdx, { WithMdxResult } from 'modules/I18n/hoc/withMdx';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import ThumbGallery from 'modules/Common/components/ThumbGallery';
import ThumbGalleryItem from 'modules/Common/components/ThumbGalleryItem';
import useTranslation from 'next-translate/useTranslation';

export default function AboutPage({ mdxContent }: WithMdxResult) {
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
              Contributors,
              Link,
              ThumbGallery,
              ThumbGalleryItem,
            }}
          />
        </TextContent>
      </Container>
    </Layout>
  );
}

export const getStaticProps = withMdx({ load: 'mdx', filename: 'about', folder: 'parts' })();
