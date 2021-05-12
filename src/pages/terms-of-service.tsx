import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from 'modules/Common/containers/Layout';

const TermsOfServicePage = () => {
  const { t } = useTranslation('common');
  return (
    <Layout>
      <h1>{t('title')}</h1>
      <h2>{t('description')}</h2>
    </Layout>
  );
};

export const getStaticProps = async ({ locale }: { locale: any }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'footer'])),
  },
});

export default TermsOfServicePage;
