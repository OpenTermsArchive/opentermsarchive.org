import Breadcrumb from 'components/BreadCrumb';
import Column from 'modules/Common/components/Column';
import Container from 'modules/Common/containers/Container';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import { useTranslation } from 'next-i18next';
const EMAIL_SUPPORT = 'contribute@disinfo.beta.gouv.fr';

const SorryPage = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      {/* Hero */}
      <Container layout="wide" paddingY={false} dark={true} bgColor="#010613">
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Hero title={t('contribute:sorry_page.title', 'Sorry 😿')}></Hero>
        </Container>
      </Container>

      <Container paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Column width={100}>
            <Breadcrumb
              items={[
                { name: 'Open Terms Archive', url: 'https://www.opentermsarchive.org' },
                { name: t('contribute:sorry_page.title') },
              ]}
            />
            <TextContent>
              <h2>{t('contribute:sorry_page.subtitle', 'We need you on a real computer')}</h2>
              <p>
                {t(
                  'contribute:sorry_page.explanation',
                  'Because we use the "hover" functionnality to highlight the parts of the document we want to track, we need you to have a computer and a mouse.'
                )}
              </p>
              <p>
                Contact us for any question <a href={`mailto:${EMAIL_SUPPORT}`}>{EMAIL_SUPPORT}</a>
              </p>
            </TextContent>
          </Column>
        </Container>
      </Container>
    </Layout>
  );
};

export default SorryPage;
