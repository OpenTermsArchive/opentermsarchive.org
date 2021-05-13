import Search, { SearchProps } from 'components/Search';
import Layout from 'modules/Common/containers/Layout';
import { useEvent } from 'react-use';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const ContributePage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  useEvent('touchstart', () => {
    router.push('/contribute/sorry');
  });

  const onSubmit: SearchProps['onSearchSubmit'] = async (url) => {
    try {
      router.push(`/contribute/service?url=${encodeURIComponent(url)}`);
    } catch (e) {
      console.log(''); // eslint-disable-line
      console.log('╔════START══e══════════════════════════════════════════════════'); // eslint-disable-line
      console.log(e); // eslint-disable-line
      console.log('╚════END════e══════════════════════════════════════════════════'); // eslint-disable-line
    }
  };

  return (
    <Layout>
      <h1>{t('contribute:home_page.title', 'Contribute')}</h1>
      <h2>{t('contribute:home_page.subtitle', 'We need you!')}</h2>
      <Search
        label={t('contribute:home_page.search.label', 'First step, please fill the URL to track')}
        buttonLabel={t('contribute:home_page.search.button', 'Next')}
        placeholder="https://www.amazon.com/gp/help/customer/display.html?nodeId=13819201"
        onSearchSubmit={onSubmit}
      />
    </Layout>
  );
};

export default ContributePage;
