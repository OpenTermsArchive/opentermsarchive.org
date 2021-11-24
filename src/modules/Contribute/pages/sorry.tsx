import Breadcrumb from 'components/BreadCrumb';
import Column from 'modules/Common/components/Column';
import Container from 'modules/Common/containers/Container';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import { useTranslation } from 'next-i18next';

const SorryPage = () => {
  const { t } = useTranslation(['contribute/sorry', 'contribute', 'common']);
  return (
    <Layout
      title={t('seo.title', { ns: 'contribute/sorry' })}
      desc={t('seo.desc', { ns: 'contribute/sorry' })}
    >
      {/* Hero */}
      <Container layout="wide" paddingY={false} dark={true} bgColor="#010613">
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Hero
            title={t('title', { ns: 'contribute/sorry' })}
            subtitle={t('subtitle', { ns: 'contribute/sorry' })}
          ></Hero>
        </Container>
      </Container>

      <Container paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Column width={100}>
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
                { name: t('breadcrumb.sorry.name', 'Sorry', { ns: 'contribute' }) },
              ]}
            />
            <TextContent>
              <p>{t('explanation', { ns: 'contribute/sorry' })}</p>
              <p>
                {t('contact.email.text', { ns: 'contribute/sorry' })}
                <a href={'mailto:' + t('contact.email', { ns: 'common' })}>
                  {t('contact.email', { ns: 'common' })}
                </a>
              </p>
            </TextContent>
          </Column>
        </Container>
      </Container>
    </Layout>
  );
};

export default SorryPage;
