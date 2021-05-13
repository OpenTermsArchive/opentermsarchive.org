import Breadcrumb from 'components/BreadCrumb';
import Layout from 'modules/Common/containers/Layout';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ThanksPage = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <h1>{t('contribute:thanks_page.title', 'Thanks')}</h1>
      <Breadcrumb
        items={[
          { name: 'Open Terms Archive', url: 'https://www.opentermsarchive.org' },
          { name: t('contribute:thanks_page.cta', 'Add another document'), url: '/contribute' },
          { name: t('contribute:thanks_page.title', 'Thanks') },
        ]}
      />
      <h2>{t('contribute:thanks_page.subtitle', 'Thanks for your contribution')}</h2>
      <p>
        {t(
          'contribute:thanks_page.explanation',
          'You only need to send us the email (a popup should have opened) and we will let you know as soon as the service is integrated in the system'
        )}
      </p>

      <Link href="/contribute">
        <a>{t('contribute:thanks_page.cta')}</a>
      </Link>
    </Layout>
  );
};

export default ThanksPage;
