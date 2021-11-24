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

const ContributePage = () => {
  const { t } = useTranslation(['common', 'contribute']);
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
    <Layout title={t('seo.title', { ns: 'contribute' })} desc={t('seo.desc', { ns: 'contribute' })}>
      {/* Hero */}
      <Container layout="wide" paddingY={false} dark={true}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Column width={70}>
            <Hero
              title={t('title', { ns: 'contribute' })}
              subtitle={t('subtitle', { ns: 'contribute' })}
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
                {
                  name: t('breadcrumb.homepage.name', { ns: 'contribute' }),
                  url: 'https://www.opentermsarchive.org',
                },
                {
                  name: t('breadcrumb.contribute.name', { ns: 'contribute' }),
                  url: './../#' + t('contribute.id', { ns: 'common' }),
                },
                { name: t('breadcrumb.index.name', { ns: 'contribute' }) },
              ]}
            />
            <TextContent>
              <p>{t('content.p1', { ns: 'contribute' })}</p>
            </TextContent>
            <Search
              label={t('search.label', { ns: 'contribute' })}
              buttonLabel={t('search.button', { ns: 'contribute' })}
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
