import Breadcrumb from 'components/BreadCrumb';
import React from 'react';
const EMAIL_SUPPORT = 'contribute@disinfo.beta.gouv.fr';
import Layout from 'modules/Common/containers/Layout';
import { useTranslation } from 'next-i18next';

const SorryPage = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <h1>{t('contribute:sorry_page.title', 'Sorry')}</h1>
      <Breadcrumb
        items={[
          { name: 'Open Terms Archive', url: 'https://www.opentermsarchive.org' },
          { name: t('contribute:sorry_page.title') },
        ]}
      />
      <h2>{t('contribute:sorry_page.subtitle', 'We need you on a real computer')}</h2>
      <p>
        {t(
          'contribute:sorry_page.explanation',
          'Because we use the "hover" functionnality to highlight the parts of the document we want to track, we need you to have a computer and a mouse.'
        )}
      </p>
      <br />
      <p>
        Contact us for any question <a href={`mailto:${EMAIL_SUPPORT}`}>{EMAIL_SUPPORT}</a>
      </p>
    </Layout>
  );
};

export default SorryPage;
