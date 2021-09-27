import { WithI18nResult, withI18n } from 'modules/I18n';

import Breadcrumb from 'components/BreadCrumb';
import Button from 'modules/Common/components/Button';
import Container from 'modules/Common/containers/Container';
import Contributors from 'modules/OTA-api/data-components/Contributors';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import { useTranslation } from 'react-i18next';
import useUrl from 'hooks/useUrl';

export default function ThanksPage({ mdxContent }: WithI18nResult) {
  const { t } = useTranslation();
  const {
    queryParams: { url },
  } = useUrl();
  return (
    <Layout
      title={t('contribute:thanks_page.seo.title', 'Thanks')}
      desc={t('contribute:thanks_page.seo.desc', 'Thanks for contributing')}
    >
      {/* Hero */}
      <Container layout="wide" paddingY={false} dark={true} bgColor="#010613">
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Hero title={t('contribute:thanks_page.title', 'Thanks')}></Hero>
        </Container>
      </Container>

      <Container gridCols="12" gridGutters="11" paddingYSmall={true}>
        <Breadcrumb
          items={[
            {
              name: t('contribute:breadcrumb.home_page.name', 'Home'),
              url: 'https://www.opentermsarchive.org',
            },
            {
              name: t('contribute:breadcrumb.contribute.name', 'Contribute'),
              url: './../#' + t('common:home_page.contribute.id', 'contribute'),
            },
            {
              name: t('contribute:breadcrumb.adddocument.name', 'Add a document'),
              url: '/contribute',
            },
            { name: t('contribute:breadcrumb.thanks.name', 'Thanks') },
          ]}
        />
      </Container>

      <Container gridCols="9" gridGutters="8" paddingY={false}>
        <TextContent>
          <MDXRemote {...(mdxContent as any)} scope={{ url }} />
        </TextContent>
      </Container>

      <Container gridCols="6" gridGutters="5">
        <Contributors subtitle={t('contribute:contributors.subtitle', 'Contributors')} />
      </Container>

      <Container gridCols="9" gridGutters="8" paddingTop={false}>
        <TextContent className="text__center">
          <hr />
          <Link href="/contribute">
            <Button>{t('contribute:thanks_page.cta')}</Button>
          </Link>
        </TextContent>
      </Container>
    </Layout>
  );
}
export const getStaticProps = withI18n({ load: 'mdx', filename: 'contribute/thanks' })();
