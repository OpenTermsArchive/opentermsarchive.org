import Layout from 'modules/Common/containers/Layout';
import SubscribeForm from 'modules/Common/components/SubscribeForm';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as FeatherIcons from 'react-icons/fi';
import { extract } from 'query-string';

const HomePage = (props: keyof typeof FeatherIcons) => {
  const { t } = useTranslation('common');

  React.createElement('FiSmile' as typeof FeatherIcons['FiSmile']);
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

const withI18n = (namespaces: string | string[]) => async (props: any) => {
  const sst = await serverSideTranslations(props.locale, ['common', 'footer']);

  return {
    props: {
      ...(await serverSideTranslations(props.locale, ['common', 'footer'])),
    },
  };
};

export const getStaticProps = withI18n(['common', 'footer'])((props) => {
  return;
});

// t const getStaticProps = async ({ locale }: { locale: any }) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ['common', 'footer'])),
//   },
// });

export const getStaticProps = props;

export default HomePage;
