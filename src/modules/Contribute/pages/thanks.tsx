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
  const { t } = useTranslation(['contribute/thanks', 'contribute', 'common']);
  const {
    queryParams: { url },
  } = useUrl();
  return (
    <Layout
      title={t('seo.title', { ns: 'contribute/thanks' })}
      desc={t('seo.desc', { ns: 'contribute/thanks' })}
    >
      {/* Hero */}
      <Container layout="wide" paddingY={false} dark={true} bgColor="#010613">
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Hero title={t('title', { ns: 'contribute/thanks' })}></Hero>
        </Container>
      </Container>

      <Container gridCols="12" gridGutters="11" paddingYSmall={true}>
        <Breadcrumb
          items={[
            {
              name: t('breadcrumb.homepage.name', { ns: 'contribute' }),
              url: 'https://www.opentermsarchive.org',
            },
            {
              name: t('breadcrumb.contribute.name', { ns: 'contribute' }),
              url: './../#' + t('contribute.id', { ns: 'common' }),
            },
            {
              name: t('breadcrumb.adddocument.name', { ns: 'contribute' }),
              url: '/contribute',
            },
            { name: t('breadcrumb.thanks.name', { ns: 'contribute' }) },
          ]}
        />
      </Container>

      <Container gridCols="9" gridGutters="8" paddingY={false}>
        <TextContent>
          <MDXRemote {...(mdxContent as any)} scope={{ url }} />
        </TextContent>
      </Container>

      <Container gridCols="6" gridGutters="5">
        <Contributors subtitle={t('contributors.subtitle', { ns: 'contribute/thanks' })} />
      </Container>

      <Container gridCols="9" gridGutters="8" paddingTop={false}>
        <TextContent className="text__center">
          <hr />
          <Link href="/contribute">
            <Button>{t('thanks_page.cta', { ns: 'contribute/thanks' })}</Button>
          </Link>
        </TextContent>
      </Container>
    </Layout>
  );
}
