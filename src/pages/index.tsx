import SubscribeForm, { SubscribeFormProps } from 'modules/Common/components/SubscribeForm';

import Article from 'modules/Common/components/Article';
import Aside from 'modules/Common/components/Aside';
import Button from 'modules/Common/components/Button';
import ButtonBlock from 'modules/Common/components/ButtonBlock';
import ButtonBlockList from 'modules/Common/components/ButtonBlockList';
import Column from 'modules/Common/components/Column';
import Container from 'modules/Common/containers/Container';
import Contributors from 'modules/OTA-api/data-components/Contributors';
import FeatureItem from 'modules/Common/components/FeatureItem';
import FeatureList from 'modules/Common/components/FeatureList';
import { FiArrowRightCircle } from 'react-icons/fi';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import Link from 'next/link';
import LinkIcon from 'modules/Common/components/LinkIcon';
import React from 'react';
import ShowcaseItem from 'modules/Common/components/ShowcaseItem';
import ShowcaseList from 'modules/Common/components/ShowcaseList';
import TextContent from 'modules/Common/components/TextContent';
import ThumbGalery from 'modules/Common/components/ThumbGalery';
import ThumbGaleryItem from 'modules/Common/components/ThumbGaleryItem';
import api from 'utils/api';
import { getServices } from 'modules/OTA-api/api';
import useNotifier from 'hooks/useNotifier';
import { useToggle } from 'react-use';
import { useTranslation } from 'next-i18next';
import useUrl from 'hooks/useUrl';
import { withI18n } from 'modules/I18n';

const HomePage = ({ services }: any) => {
  const { t } = useTranslation('common');
  const [subscribing, toggleSubscribing] = useToggle(false);
  const { queryParams, pushQueryParams } = useUrl();
  const { notify } = useNotifier();

  // Format services and docs feature item title
  let nbServicesTitle = t('common:home_page.how.feature1.defaultTitle', 'Many services');
  let nbDocsTitle = t('common:home_page.how.feature2.defaultTitle', 'Many documents');

  if (services) {
    const nbServices = Object.keys(services).length;
    nbServicesTitle = t('common:home_page.how.feature1.dynamicTitle', '{{count}} services', {
      count: nbServices,
    });

    const nbDocuments = Object.values(services).flat().length;
    nbDocsTitle = t('common:home_page.how.feature2.dynamicTitle', '{{count}} documents', {
      count: nbDocuments,
    });
  }

  const onSubscription: SubscribeFormProps['onSubmit'] = async (data) => {
    let success;
    toggleSubscribing(true);

    try {
      await api.post(`/api/subscribe`, {
        email: data.email,
        service: data.service,
        documentType: data.documentType,
      });
      notify('success', t('common:subscribe_form.success', 'Thanks for subscribing'));
      success = true;
    } catch (err) {
      notify(
        'error',
        t('common:subscribe_form.error', 'Sorry, but there was a problem, please try again')
      );
      success = false;
    }
    toggleSubscribing(false);
    return success;
  };

  return (
    <Layout
      title={t('common:home_page.seo.title', 'Follow the changes to the terms of service')}
      desc={t(
        'common:home_page.seo.desc',
        'Services have terms that can change over time. Open Terms Archive enables users rights advocates, regulatory bodies and any interested citizen to follow the changes to these terms.'
      )}
    >
      {/* Hero */}
      <Container layout="wide" backgroundImage="/images/bg1.webp" dark={true} paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Hero
            title={t('common:home_page.title', 'Follow the changes to the terms of service')}
            subtitle={t(
              'common:home_page.subtitle',
              'Services have terms that can change over time. Open Terms Archive enables users rights advocates, regulatory bodies and any interested citizen to follow the changes to these terms.'
            )}
          ></Hero>
        </Container>
      </Container>

      {/* Subscribe form */}
      <Container layout="wide">
        <Container
          gridCols="12"
          gridGutters="11"
          flex={true}
          paddingX={false}
          paddingTop={false}
          paddingBottom={false}
        >
          <Column width={60}>
            <SubscribeForm
              defaultServices={services}
              onSubmit={onSubscription}
              loading={subscribing}
              onChange={(data) => pushQueryParams(data, undefined, { shallow: true })}
              defaultValues={{
                service: queryParams.service,
                documentType: queryParams.documentType,
              }}
            />
          </Column>
          <Column width={40} alignX="center">
            <img src="/images/form-subscribe.jpg" alt="" loading="lazy" />
          </Column>
        </Container>
      </Container>

      {/* How section */}
      <Container layout="wide" gray={true}>
        <Container
          gridCols="10"
          gridGutters="11"
          flex={true}
          paddingY={false}
          id={t('common:home_page.how.id', 'how')}
        >
          <Article
            subtitle={t('common:home_page.how.subtitle', 'How ?')}
            title={t('common:home_page.how.title', 'How does OTA work?')}
            titleLevel="h2"
          >
            <TextContent>
              <p>
                {t(
                  'common:home_page.how.desc.p1',
                  'Services are declared within Open Terms Archive with a declaration file listing all the documents that, together, constitute the terms under which this service can be used. These documents all have a type, such as “terms and conditions”, “privacy policy”, “developer agreement”…'
                )}
              </p>
              <p>
                {t(
                  'common:home_page.how.desc.p2',
                  'In order to track their changes, documents are periodically obtained by fetching a web location and selecting content within the web page to remove the noise (ads, navigation menu, login fields…). Beyond selecting a subset of a page, some documents have additional noise (hashes in links, CSRF tokens…) that would be false for changes. Open Terms Archive thus supports specific filters for each document.'
                )}
              </p>
              <p>
                {t(
                  'common:home_page.how.desc.p3',
                  'However, the shape of that noise can change over time. In order to recover in case of information loss during the noise filtering step, a snapshot is recorded every there is a change. After the noise is filtered out from the snapshot, if there are changes in the resulting document, a new version of the document is recorded.'
                )}
              </p>
              <Link href={t('common:home_page.how.button.href', '/how-it-works')}>
                <a title={t('common:home_page.how.button.title', 'How OTA works ?')}>
                  <Button type="secondary">
                    {t('common:home_page.how.button.label', 'Know more')}
                  </Button>
                </a>
              </Link>
            </TextContent>
          </Article>
          <Aside>
            <FeatureList>
              <FeatureItem
                iconName="FiBox"
                title={nbServicesTitle}
                desc={t(
                  'common:home_page.how.feature1.desc',
                  'Google, Amazon, Apple, AirBnB, Facebook, Twitter, Instagram, Bing, Microsoft, Reddit, Youtube, TikTok...'
                )}
              />
              <FeatureItem
                iconName="FiFile"
                title={nbDocsTitle}
                desc={t(
                  'common:home_page.how.feature2.desc',
                  'Terms of Service, Privacy Policy, Trackers Policy, Developer Terms, Community Guidelines...'
                )}
              />
              <FeatureItem
                iconName="FiSmile"
                title={t('common:home_page.how.feature3.title', 'Open Source')}
                desc={t(
                  'common:home_page.how.feature3.desc',
                  'Free and collaborative software, any entity can contribute to improve it.'
                )}
              />
            </FeatureList>
          </Aside>
        </Container>
      </Container>

      {/* Contribute */}
      <Container
        gridCols="12"
        gridGutters="11"
        id={t('common:home_page.contribute.id', 'contribute')}
      >
        <Container gridCols="8" gridGutters="7" paddingY={false}>
          <Column width={100} alignX="center">
            <img src="/images/contribute.jpg" loading="lazy" />
          </Column>
        </Container>
        <ButtonBlockList
          className="mt__XL"
          title={t('common:home_page.contribute.title', 'Want to help us build a digital common ?')}
          subtitle={t('common:home_page.contribute.subtitle', 'Contribute')}
        >
          <ButtonBlock
            title={t('common:home_page.contribute.buttonbloc1.title', 'Add documents')}
            desc={t(
              'common:home_page.contribute.buttonbloc1.desc',
              'Easily and quickly add documents to follow.'
            )}
            iconName="FiPlus"
            iconColor="#0496FF"
          >
            <Link href={t('common:home_page.contribute.buttonbloc1.button.href', '/contribute')}>
              <a
                title={t(
                  'common:home_page.contribute.buttonbloc1.link.title',
                  'Add a document now'
                )}
              >
                <Button>
                  {t('common:home_page.contribute.buttonbloc1.button.label', 'Add now')}
                </Button>
              </a>
            </Link>
          </ButtonBlock>
          <ButtonBlock
            title={t('common:home_page.contribute.buttonbloc2.title', 'Improve source code')}
            desc={t(
              'common:home_page.contribute.buttonbloc2.desc',
              'Add features, write tests, fix bugs, help us make better code.'
            )}
            iconName="FiGithub"
            iconColor="#0496FF"
          >
            <Link
              href={t(
                'common:home_page.contribute.buttonbloc2.button.href',
                'https://github.com/ambanum/OpenTermsArchive'
              )}
            >
              <a
                title={t(
                  'common:home_page.contribute.buttonbloc2.link.title',
                  'Go to the GitHub repository'
                )}
              >
                <Button>
                  {t('common:home_page.contribute.buttonbloc2.button.label', 'View source code')}
                </Button>
              </a>
            </Link>
          </ButtonBlock>
          <ButtonBlock
            title={t('common:home_page.contribute.buttonbloc3.title', 'Use the data')}
            desc={t(
              'common:home_page.contribute.buttonbloc3.desc',
              'Design your use cases using the data via the API.'
            )}
            iconName="FiDatabase"
            iconColor="#0496FF"
          >
            <Link
              href={t(
                'common:home_page.contribute.buttonbloc3.button.href',
                'https://disinfo.quaidorsay.fr/api/open-terms-archive/docs'
              )}
            >
              <a
                title={t(
                  'common:home_page.contribute.buttonbloc3.link.title',
                  'Read the documentation for use the API'
                )}
              >
                <Button>
                  {t('common:home_page.contribute.buttonbloc3.button.label', 'Discover the API')}
                </Button>
              </a>
            </Link>
            <LinkIcon
              iconColor="#999999"
              href={t(
                'common:home_page.contribute.buttonbloc3.sublink.href',
                'https://github.com/ambanum/OpenTermsArchive-versions/releases'
              )}
              small={true}
            >
              <a
                title={t(
                  'common:home_page.contribute.buttonbloc3.sublink.title',
                  'Download a dataset'
                )}
              >
                {t(
                  'common:home_page.contribute.buttonbloc3.sublink.label',
                  'or download a dataset'
                )}
              </a>
            </LinkIcon>
          </ButtonBlock>
        </ButtonBlockList>
        <Container gridCols="6" gridGutters="5" paddingYSmall={true}>
          <Contributors subtitle={t('common:home_page.contributors.subtitle', 'Thanks 🙏')} />
        </Container>
      </Container>

      {/* Values */}
      <Container
        layout="wide"
        backgroundImage="/images/bg2.webp"
        paddingY={false}
        id={t('common:home_page.values.id', 'values')}
      >
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false} dark={true}>
          <Column width={50} alignX="center" alignY="center">
            <img src="/images/values.png" loading="lazy" />
          </Column>
          <Column
            width={50}
            title={t('common:home_page.values.title', 'What we believe in')}
            subtitle={t('common:home_page.values.subtitle', 'values')}
          >
            <TextContent>
              <p>
                {t(
                  'common:home_page.values.desc.p1',
                  'Large digital companies today occupy a central position which, through the ToS, allows them to transform their practices and values ​​into de facto which are at the heart of many aspects of our existence and our economies.'
                )}
              </p>
              <p>
                {t(
                  'common:home_page.values.desc.p2',
                  'However, they communicate in an insufficiently clear, readable and continuous manner on these ToS, whereas rigorously understanding the ToS and how they have evolved over time has become essential to appreciate the practices and loyalty of these digital players.'
                )}
              </p>
              <p>
                {t('common:home_page.values.desc.p3', ' This understanding is also necessary to:')}
              </p>
              <ul>
                <li>
                  <FiArrowRightCircle color="#0496FF" />
                  {t(
                    'common:home_page.values.desc.list.item1',
                    'each user so that he can identify precisely what he has agreed upon, the data he has shared, the rights he has yielded to the services and the rights he has retained;'
                  )}
                </li>
                <li>
                  <FiArrowRightCircle color="#0496FF" />
                  {t(
                    'common:home_page.values.desc.list.item2',
                    'the authorities in order to verify the compatibility of these contractual frameworks with national and supranational law, in particular when the latter evolve;'
                  )}
                </li>
                <li>
                  <FiArrowRightCircle color="#0496FF" />
                  {t(
                    'common:home_page.values.desc.list.item3',
                    'regulators so that they can assess the efforts of the platforms, but also to make sure that they say what they do and that they do what they say. It creates transparency in the practices of digital players, in line with the first recommendations discussed within the framework of the DSA and the DMA.'
                  )}
                </li>
              </ul>
            </TextContent>
          </Column>
        </Container>
      </Container>

      {/* Showcase */}
      <Container
        gridCols="10"
        gridGutters="11"
        flex={true}
        id={t('common:home_page.showcase.id', 'built-with')}
      >
        <Column
          width={50}
          title={t('common:home_page.showcase.title', 'Built with')}
          subtitle={t('common:home_page.showcase.title', 'Showcase')}
        >
          <ShowcaseList>
            <ShowcaseItem
              title={t('common:home_page.showcase.item1.title', 'Scripta Manent')}
              desc={t(
                'common:home_page.showcase.item1.desc',
                'Explore the contractual documents of the main online service providers and compare their evolution through time.'
              )}
              author={t(
                'common:home_page.showcase.item1.author',
                'By the team of the French Ambassador for Digital Affairs'
              )}
            >
              <LinkIcon
                iconColor="#0496FF"
                href={t(
                  'common:home_page.showcase.item1.link.href',
                  'https://disinfo.quaidorsay.fr/fr/open-terms-archive/scripta-manent'
                )}
              >
                <a
                  title={t(
                    'common:home_page.showcase.item1.link.title',
                    'Try Scripta Manent on Disinfo website now'
                  )}
                >
                  {t('common:home_page.showcase.item1.link.label', 'Try')}
                </a>
              </LinkIcon>
            </ShowcaseItem>
            <ShowcaseItem
              title={t('common:home_page.showcase.item2.title', 'Disinfo experiments')}
              desc={t(
                'common:home_page.showcase.item2.desc',
                'Experiments are ongoing so as to produce use cases using Open Terms Archive data.'
              )}
              author={t(
                'common:home_page.showcase.item2.author',
                'By the team of the French Ambassador for Digital Affairs'
              )}
            >
              <LinkIcon
                iconColor="#0496FF"
                href={t(
                  'common:home_page.showcase.item2.link.href',
                  'https://disinfo.quaidorsay.fr/en/open-terms-archive/experiments'
                )}
              >
                <a
                  title={t(
                    'common:home_page.showcase.item2.link.title',
                    'See Disinfo experiments with Open Terms Archive data'
                  )}
                >
                  {t('common:home_page.showcase.item2.link.label', 'See')}
                </a>
              </LinkIcon>
            </ShowcaseItem>
          </ShowcaseList>
        </Column>
        <Column width={50} alignX="center" alignY="center">
          <ButtonBlock
            title={t(
              'common:home_page.showcase.buttonbloc.title',
              'Have you developed an Open Terms Archive based tool?'
            )}
            desc={t(
              'common:home_page.showcase.buttonbloc.desc',
              'Let the community know about it here'
            )}
            fillParent={true}
          >
            <Link
              href={t(
                'common:home_page.showcase.buttonbloc.href',
                'mailto:contact@opentermsarchive.org'
              )}
            >
              <a title={t('common:home_page.showcase.buttonbloc.link.title', 'Send us a mail')}>
                <Button>{t('common:home_page.showcase.buttonbloc.label', 'Contact us')}</Button>
              </a>
            </Link>
          </ButtonBlock>
        </Column>
      </Container>

      {/* Partners */}
      <Container layout="fluid" gridCols="12" gridGutters="11" flex={true} paddingX={false}>
        <ThumbGalery
          title={t('common:home_page.partners.title', 'Our Partners')}
          subtitle={t(
            'common:home_page.partners.subtitle',
            'They make Open Terms Archive existing'
          )}
          titleLevel="h3"
        >
          <Link href="https://disinfo.quaidorsay.fr">
            <a target="_blank">
              <ThumbGaleryItem src="/images/logo-ambnum.png" width="158" height="80" />
            </a>
          </Link>
          <Link href="https://disinformationindex.org/">
            <a target="_blank">
              <ThumbGaleryItem src="/images/logo-gdi.png" width="150" height="32" />
            </a>
          </Link>
          <ThumbGaleryItem src="/images/nextgen.png" width="191" height="48" />
          <ThumbGaleryItem src="/images/france-relance.png" width="77" height="77" />
          <Link href="https://www.peren.gouv.fr/">
            <a target="_blank">
              <ThumbGaleryItem src="/images/logo-peren.png" width="150" height="121" />
            </a>
          </Link>
        </ThumbGalery>
      </Container>

      {/* Press */}
      <Container
        paddingY={false}
        gray={true}
        layout="fluid"
        gridCols="12"
        gridGutters="11"
        flex={true}
        paddingX={false}
        paddingYSmall={true}
      >
        <ThumbGalery
          title={t('common:home_page.press.title', 'Press')}
          subtitle={t('common:home_page.press.subtitle', 'They talk about Open Terms Archive')}
          titleLevel="h4"
          small={true}
        >
          <ThumbGaleryItem src="/images/01net.png" width="75" height="32" small={true} />
          <ThumbGaleryItem src="/images/labofnac.png" width="125" height="18" small={true} />
          <ThumbGaleryItem src="/images/nextimpact.png" width="122" height="30" small={true} />
          <ThumbGaleryItem src="/images/numerama.png" width="119" height="24" small={true} />
          <ThumbGaleryItem src="/images/zdnet.png" width="76" height="50" small={true} />
          <ThumbGaleryItem src="/images/wired.png" width="112" height="20" small={true} />
        </ThumbGalery>
      </Container>
    </Layout>
  );
};

export const getStaticProps = withI18n()(async (props: any) => {
  const services = await getServices();
  return JSON.parse(JSON.stringify({ props: { ...props, services }, revalidate: 10 }));
});

export default HomePage;
