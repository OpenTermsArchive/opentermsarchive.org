import { WithI18nResult, withI18n } from 'modules/I18n';

import Button from 'modules/Common/components/Button';
import Column from 'modules/Common/components/Column';
import Container from 'modules/Common/containers/Container';
import Hero from 'modules/Common/components/Hero';
import { FiTwitter as IconTwitter } from 'react-icons/fi';
import Layout from 'modules/Common/containers/Layout';
import Link from 'next/link';
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
          <Hero
            title={t('case-studies:hero.title')}
            subtitle={t('case-studies:hero.subtitle')}
          ></Hero>
        </Container>
      </Container>

      <Container gridCols="9" gridGutters="8">
        <TextContent>
          <MDXRemote {...(mdxContent as any)} components={{ LinkIcon }} />
        </TextContent>
      </Container>

      {/* Follow us */}
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
    </Layout>
  );
}

export const getStaticProps = withI18n({ load: 'mdx', filename: 'case-studies' })();
