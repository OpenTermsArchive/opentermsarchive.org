import Layout from 'modules/Common/containers/Layout';
import SubscribeForm from 'modules/Common/components/SubscribeForm';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const HomePage = () => {
  const { t } = useTranslation('common');
  return (
    <Layout>
      <h1>{t('common:home_page.title', 'Follow the changes to the terms of service')}</h1>
      <h2>
        {t(
          'common:home_page.subtitle',
          'Services have terms that can change over time. Open Terms Archive enables users rights advocates, regulatory bodies and any interested citizen to follow the changes to these terms.'
        )}
      </h2>
      <SubscribeForm />
    </Layout>
  );
};

export const getStaticProps = async ({ locale }: { locale: any }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'footer'])),
  },
});
export default HomePage;
