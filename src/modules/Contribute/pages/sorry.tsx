import Breadcrumb from 'components/BreadCrumb';
import Column from 'modules/Common/components/Column';
import Container from 'modules/Common/containers/Container';
import { useRouter } from 'next/router';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import { useTranslation } from 'next-i18next';
const EMAIL_SUPPORT = 'contact@opentermsarchive.org';

const SorryPage = () => {
  const router = useRouter();
  const { localPath, destination } = router.query;
  const commonUrlParams = `destination=${destination}${localPath ? `&localPath=${localPath}` : ''}`;

  const { t } = useTranslation();
  return (
    <Layout title={t('contribute/sorry:seo.title')}>
      {/* Hero */}
      <Container layout="wide" paddingY={false} dark={true} bgColor="#010613">
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Hero
            title={t('contribute/sorry:title')}
            subtitle={t('contribute/sorry:subtitle')}
          ></Hero>
        </Container>
      </Container>

      <Container paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Column width={100}>
            <Breadcrumb
              items={[
                {
                  name: t('contribute:breadcrumb.home_page.name'),
                  url: 'https://opentermsarchive.org',
                },
                {
                  name: t('contribute/home:title'),
                  url: `/contribute?destination=${commonUrlParams}`,
                },
                { name: t('contribute/sorry:title') },
              ]}
            />
            <TextContent>
              <p>{t('contribute/sorry:explanation')}</p>
              <p>
                {t('contribute/sorry:explanation.contact')}{' '}
                <a href={`mailto:${EMAIL_SUPPORT}`}>{EMAIL_SUPPORT}</a>
              </p>
            </TextContent>
          </Column>
        </Container>
      </Container>
    </Layout>
  );
};

export default SorryPage;
