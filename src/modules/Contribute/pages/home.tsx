import Search, { SearchProps } from 'components/Search/Search';

import Breadcrumb from 'components/BreadCrumb';
import Column from 'modules/Common/components/Column';
import Container from 'modules/Common/containers/Container';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import TextContent from 'modules/Common/components/TextContent';
import { useEvent } from 'react-use';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const ContributeHomePage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  useEvent('touchstart', () => {
    router.push('/contribute/sorry');
  });

  const onSubmit: SearchProps['onSearchSubmit'] = async (url) => {
    try {
      router.push(`/contribute/service?url=${encodeURIComponent(url)}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Layout
      title={t('contribute/home:seo.title', 'Contributing to Open Terms Archive')}
      desc={t('contribute/home:seo.desc', 'Thanks for helping')}
    >
      {/* Hero */}
      <Container layout="wide" paddingY={false} dark={true}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Column width={70}>
            <Hero
              title={t('contribute/home:title', 'Contributing to Open Terms Archive')}
              subtitle={t('contribute/home:subtitle', 'Thanks for helping')}
            ></Hero>
          </Column>
          <Column width={30}>
            <img src="/images/add-document.png" />
          </Column>
        </Container>
      </Container>

      <Container paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Column width={100}>
            <Breadcrumb
              items={[
                { name: 'Open Terms Archive', url: 'https://www.opentermsarchive.org' },
                {
                  name: 'Contribute',
                  url: './#' + t('contribute/home:contribute.id', 'contribute'),
                },
                { name: t('contribute/home:title') },
              ]}
            />
            <TextContent>
              <p>
                {t(
                  'contribute/home:content.p1',
                  'With 3-step process, you can add a document quickly (it should only take you a few minutes)'
                )}
              </p>
            </TextContent>
            <Search
              label={t('contribute/home:search.label', 'First step, please fill the URL to track')}
              buttonLabel={t('contribute/home:search.button', 'Next')}
              placeholder="https://www.amazon.com/gp/help/customer/display.html?nodeId=13819201"
              onSearchSubmit={onSubmit}
            />
          </Column>
        </Container>
      </Container>
    </Layout>
  );
};

export default ContributeHomePage;
