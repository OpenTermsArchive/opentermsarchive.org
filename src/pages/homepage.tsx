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
  const { t } = useTranslation(['common', 'homepage']);
  const [subscribing, toggleSubscribing] = useToggle(false);
  const { queryParams, pushQueryParams } = useUrl();
  const { notify } = useNotifier();

  // Format services and docs feature item title
  let nbServicesTitle = t('how.feature1.defaultTitle', { ns: 'homepage' });
  let nbDocsTitle = t('how.feature2.defaultTitle', { ns: 'homepage' });

  if (services) {
    const nbServices = Object.keys(services).length;
    nbServicesTitle = t('how.feature1.dynamicTitle', {
      count: nbServices,
      ns: 'homepage',
    });

    const nbDocuments = Object.values(services).flat().length;
    nbDocsTitle = t('how.feature2.dynamicTitle', {
      count: nbDocuments,
      ns: 'homepage',
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
      notify('success', t('subscribe_form.success', { ns: 'common' }));
      success = true;
    } catch (err) {
      notify('error', t('subscribe_form.error', { ns: 'common' }));
      success = false;
    }
    toggleSubscribing(false);
    return success;
  };

  return (
    <Layout title={t('seo.title', { ns: 'homepage' })} desc={t('seo.desc', { ns: 'homepage' })}>
      {/* Hero */}
      <Container layout="wide" dark={true} paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Hero
            title={t('title', { ns: 'homepage' })}
            subtitle={t('subtitle', { ns: 'homepage' })}
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
          id={t('how.id', { ns: 'homepage' })}
        >
          <Article
            subtitle={t('how.subtitle', { ns: 'homepage' })}
            title={t('how.title', { ns: 'homepage' })}
            titleLevel="h2"
          >
            <TextContent>
              <p>{t('how.desc.p1', { ns: 'homepage' })}</p>
              <p>{t('how.desc.p2', { ns: 'homepage' })}</p>
              <p>{t('how.desc.p3', { ns: 'homepage' })}</p>
              <Link href="/how-it-works">
                <a title={t('how.button.title', { ns: 'homepage' })}>
                  <Button type="secondary">{t('how.button.label', { ns: 'homepage' })}</Button>
                </a>
              </Link>
            </TextContent>
          </Article>
          <Aside>
            <FeatureList>
              <FeatureItem
                iconName="FiBox"
                title={nbServicesTitle}
                desc={t('how.feature1.desc', { ns: 'homepage' })}
              />
              <FeatureItem
                iconName="FiFile"
                title={nbDocsTitle}
                desc={t('how.feature2.desc', { ns: 'homepage' })}
              />
              <FeatureItem
                iconName="FiSmile"
                title={t('how.feature3.title', { ns: 'homepage' })}
                desc={t('how.feature3.desc', { ns: 'homepage' })}
              />
            </FeatureList>
          </Aside>
        </Container>
      </Container>

      {/* Contribute */}
      <Container gridCols="12" gridGutters="11" id={t('contribute.id', { ns: 'homepage' })}>
        <Container gridCols="8" gridGutters="7" paddingY={false}>
          <Column width={100} alignX="center">
            <img src="/images/contribute.jpg" loading="lazy" />
          </Column>
        </Container>
        <ButtonBlockList
          className="mt__XL"
          title={t('contribute.title', {
            ns: 'homepage',
          })}
          subtitle={t('contribute.subtitle', { ns: 'homepage' })}
        >
          <ButtonBlock
            title={t('contribute.buttonblock1.title', { ns: 'homepage' })}
            desc={t('contribute.buttonblock1.desc', {
              ns: 'homepage',
            })}
            iconName="FiPlus"
            iconColor="var(--colorPrimary)"
          >
            <Link href="/contribute">
              <a title={t('contribute.buttonblock1.link.title', { ns: 'homepage' })}>
                <Button>{t('contribute.buttonblock1.button.label', { ns: 'homepage' })}</Button>
              </a>
            </Link>
          </ButtonBlock>
          <ButtonBlock
            title={t('contribute.buttonblock2.title', { ns: 'homepage' })}
            desc={t('contribute.buttonblock2.desc', { ns: 'homepage' })}
            iconName="FiGithub"
            iconColor="var(--colorPrimary)"
          >
            <Link href="https://github.com/ambanum/OpenTermsArchive">
              <a title={t('contribute.buttonblock2.link.title', { ns: 'homepage' })}>
                <Button>{t('contribute.buttonblock2.button.label', { ns: 'homepage' })}</Button>
              </a>
            </Link>
          </ButtonBlock>
          <ButtonBlock
            title={t('contribute.buttonblock3.title', 'Use the data', { ns: 'homepage' })}
            desc={t('contribute.buttonblock3.desc', { ns: 'homepage' })}
            iconName="FiDatabase"
            iconColor="var(--colorPrimary)"
          >
            <a
              href="https://opentermsarchive.org/data/api"
              title={t('contribute.buttonblock3.link.title', { ns: 'homepage' })}
              target="_blank"
            >
              <Button>{t('contribute.buttonblock3.button.label', { ns: 'homepage' })}</Button>
            </a>
            <LinkIcon
              iconColor="var(--colorBlack400)"
              href="https://github.com/ambanum/OpenTermsArchive-versions/releases"
              small={true}
            >
              <a title={t('contribute.buttonblock3.sublink.title', { ns: 'homepage' })}>
                {t('contribute.buttonblock3.sublink.label', { ns: 'homepage' })}
              </a>
            </LinkIcon>
          </ButtonBlock>
        </ButtonBlockList>
        <Container gridCols="6" gridGutters="5" paddingYSmall={true}>
          <Contributors subtitle={t('contributors.subtitle', { ns: 'homepage' })} />
        </Container>
      </Container>

      {/* Values */}
      <Container layout="wide" dark={true} paddingY={false} id={t('values.id', { ns: 'homepage' })}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false} dark={true}>
          <Column width={50} alignX="center" alignY="center">
            <img src="/images/values.png" loading="lazy" />
          </Column>
          <Column
            width={50}
            title={t('values.title', { ns: 'homepage' })}
            subtitle={t('values.subtitle', { ns: 'homepage' })}
          >
            <TextContent>
              <p>{t('values.desc.p1', { ns: 'homepage' })}</p>
              <p>{t('values.desc.p2', { ns: 'homepage' })}</p>
              <p>{t('values.desc.p3', { ns: 'homepage' })}</p>
              <ul>
                <li>
                  <FiArrowRightCircle color="#0496FF" />
                  {t('values.desc.list.item1', { ns: 'homepage' })}
                </li>
                <li>
                  <FiArrowRightCircle color="#0496FF" />
                  {t('values.desc.list.item2', { ns: 'homepage' })}
                </li>
                <li>
                  <FiArrowRightCircle color="#0496FF" />
                  {t('values.desc.list.item3', { ns: 'homepage' })}
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
        id={t('showcase.id', { ns: 'homepage' })}
      >
        <Column
          width={50}
          title={t('showcase.title', { ns: 'homepage' })}
          subtitle={t('showcase.title', { ns: 'homepage' })}
        >
          <ShowcaseList>
            <ShowcaseItem
              title={t('showcase.item1.title', { ns: 'homepage' })}
              desc={t('showcase.item1.desc', { ns: 'homepage' })}
              author={t('showcase.item1.author', { ns: 'homepage' })}
            >
              <LinkIcon
                iconColor="var(--colorBlack400)"
                href="https://disinfo.quaidorsay.fr/fr/open-terms-archive/scripta-manent"
              >
                <a title={t('showcase.item1.link.title', { ns: 'homepage' })}>
                  {t('showcase.item1.link.label', { ns: 'homepage' })}
                </a>
              </LinkIcon>
            </ShowcaseItem>
            <ShowcaseItem
              title={t('showcase.item2.title', { ns: 'homepage' })}
              desc={t('showcase.item2.desc', { ns: 'homepage' })}
              author={t('showcase.item2.author', { ns: 'homepage' })}
            >
              <LinkIcon
                iconColor="var(--colorPrimary)"
                href="https://disinfo.quaidorsay.fr/en/open-terms-archive/experiments"
              >
                <a title={t('showcase.item2.link.title', { ns: 'homepage' })}>
                  {t('showcase.item2.link.label', { ns: 'homepage' })}
                </a>
              </LinkIcon>
            </ShowcaseItem>
          </ShowcaseList>
        </Column>
        <Column width={50} alignX="center" alignY="center">
          <ButtonBlock
            title={t('showcase.buttonblock.title', { ns: 'homepage' })}
            desc={t('showcase.buttonblock.desc', { ns: 'homepage' })}
            fillParent={true}
          >
            <Link
              href={
                `mailto:` + t('contact.email', 'contact@opentermsarchive.org', { ns: 'common' })
              }
            >
              <a title={t('showcase.buttonblock.link.title', { ns: 'homepage' })}>
                <Button>{t('showcase.buttonblock.label', { ns: 'homepage' })}</Button>
              </a>
            </Link>
          </ButtonBlock>
        </Column>
      </Container>

      {/* Partners */}
      <Container layout="fluid" gridCols="12" gridGutters="11" flex={true} paddingX={false}>
        <ThumbGalery
          title={t('partners.title', { ns: 'homepage' })}
          subtitle={t('partners.subtitle', { ns: 'homepage' })}
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
          title={t('press.title', { ns: 'homepage' })}
          subtitle={t('press.subtitle', { ns: 'homepage' })}
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
