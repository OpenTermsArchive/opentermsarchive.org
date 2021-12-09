import { WithI18nResult, withI18n } from 'modules/I18n';

import Container from 'modules/Common/containers/Container';
import Contributors from 'modules/OTA-api/data-components/Contributors';
import Hero from 'modules/Common/components/Hero';
import Image from 'next/image';
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
      <Container gridCols="10" gridGutters="9" paddingX={false}>
        <TextContent>
          <MDXRemote
            {...(mdxContent as any)}
            components={{
              Image: Image,
              ThumbGalery: ThumbGalery,
              ThumbGaleryItem: ThumbGaleryItem,
            }}
          />
        </TextContent>
      </Container>
      <Container gridCols="6" gridGutters="5" paddingTop={false}>
        <Contributors />
      </Container>

      <Container layout="fluid" gridCols="12" gridGutters="11" flex={true} paddingTop={false}>
        <ThumbGalery>
          <Link href="https://disinfo.quaidorsay.fr">
            <a target="_blank">
              <ThumbGaleryItem src="/images/logo-ambnum.png" width="158" height="80" />
            </a>
          </Link>
          <Link href="https://disinformationindex.org/">
            <a target="_blank">
              <ThumbGaleryItem src="/images/logo-gdi.png" width="150" height="32" />
            </a>
          </Link>
          <Link href="https://www.peren.gouv.fr/">
            <a target="_blank">
              <ThumbGaleryItem src="/images/logo-peren.png" width="190" height="126" />
            </a>
          </Link>
        </ThumbGalery>
      </Container>
    </Layout>
  );
}

export const getStaticProps = withI18n({ load: 'mdx', filename: 'about' })();
