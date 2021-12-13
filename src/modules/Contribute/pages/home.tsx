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
    <Layout title={t('contribute/home:seo.title')} desc={t('contribute/home:seo.desc')}>
      {/* Hero */}
      <Container layout="wide" paddingY={false} dark={true}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Hero title={t('contribute/home:title')} subtitle={t('contribute/home:subtitle')}></Hero>
        </Container>
      </Container>

      <Container paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Column width={100}>
            <Breadcrumb
              items={[
                {
                  name: t('contribute:breadcrumb.home_page.name'),
                  url: 'https://www.opentermsarchive.org',
                },
                { name: t('contribute/home:title') },
              ]}
            />
            <TextContent>
              <p>{t('contribute/home:content.p1')}</p>
            </TextContent>
            <Search
              label={t('contribute/home:search.label')}
              buttonLabel={t('contribute/home:search.button')}
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
