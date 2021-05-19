import Layout from 'modules/Common/containers/Layout';
// import { useTranslation } from 'next-i18next';
import { withI18n } from 'modules/I18n';

const TermsOfServicePage = () => {
  // const { t } = useTranslation('common');
  return <Layout>TODO</Layout>;
};

export const getStaticProps = withI18n(['common'])();

export default TermsOfServicePage;
