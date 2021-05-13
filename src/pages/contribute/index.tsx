import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from 'modules/Common/containers/Layout';
import { withI18n } from 'modules/I18n';

const ContributePage = () => {
  const { t } = useTranslation('common');
  return (
    <Layout>
      <h1>{t('contribute:home_page.title', 'Contributing to Open Terms Archive')}</h1>
      <h2>{t('contribute:home_page.subtitle', 'Thanks for helping')}</h2>
    </Layout>
  );
};

export const getStaticProps = withI18n(['contribute'])();

export default ContributePage;
