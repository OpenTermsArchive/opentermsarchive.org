import Search, { SearchProps } from 'components/Search/Search';

import Column from 'modules/Common/components/Column';
import Container from 'modules/Common/containers/Container';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import TextContent from 'modules/Common/components/TextContent';
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
      {/* Hero */}
      <Container layout="wide" paddingY={false} dark={true} bgColor="#010613">
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Hero
            title={t('contribute:home_page.title', 'Contributing to Open Terms ArchiveBETA')}
            subtitle={t('contribute:home_page.subtitle', 'Thanks for helping')}
          ></Hero>
        </Container>
      </Container>

      <Container paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Column width={100}>
            <Search
              label={t(
                'contribute:home_page.search.label',
                'First step, please fill the URL to track'
              )}
              buttonLabel={t('contribute:home_page.search.button', 'Next')}
              placeholder="https://www.amazon.com/gp/help/customer/display.html?nodeId=13819201"
              onSearchSubmit={onSubmit}
            />
          </Column>
        </Container>
      </Container>
    </Layout>
  );
};

export default ContributePage;
