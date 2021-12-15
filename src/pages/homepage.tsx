import Button from 'modules/Common/components/Button';
import ButtonBlock from 'modules/Common/components/ButtonBlock';
import ButtonBlockList from 'modules/Common/components/ButtonBlockList';
import Card from 'modules/Common/components/Card';
import CardList from 'modules/Common/components/CardList';
import Column from 'modules/Common/components/Column';
import Container from 'modules/Common/containers/Container';
import Contributors from 'modules/OTA-api/data-components/Contributors';
import Hero from 'modules/Common/components/Hero';
import ImageArchive from '../../public/images/archive.svg';
import ImageDection from '../../public/images/detection.svg';
import ImageIdentify from '../../public/images/identify.svg';
import ImagePublication from '../../public/images/publication.svg';
import Layout from 'modules/Common/containers/Layout';
import Link from 'next/link';
import LinkIcon from 'modules/Common/components/LinkIcon';
import React from 'react';
import ThumbGalery from 'modules/Common/components/ThumbGalery';
import ThumbGaleryItem from 'modules/Common/components/ThumbGaleryItem';
import { getServices } from 'modules/OTA-api/api';
import { useTranslation } from 'next-i18next';
import { withI18n } from 'modules/I18n';

const HomePage = ({ services }: any) => {
  const { t } = useTranslation();

  // Format services and docs feature item title
  let nbServicesTitle = t('homepage:how.feature1.defaultTitle', 'Many services');
  let nbDocsTitle = t('homepage:how.feature2.defaultTitle', 'Many documents');

  if (services) {
    const nbServices = Object.keys(services).length;
    nbServicesTitle = t('homepage:how.feature1.dynamicTitle', '{{count}} services', {
      count: nbServices,
    });

    const nbDocuments = Object.values(services).flat().length;
    nbDocsTitle = t('homepage:how.feature2.dynamicTitle', '{{count}} documents', {
      count: nbDocuments,
    });
  }

  return (
    <Layout title={t('homepage:seo.title')} desc={t('homepage:seo.desc')}>
      {/* Mission statement + What is it ? */}
      <Container layout="wide" dark={true} paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Hero title={t('homepage:mission_statement')} subtitle={t('homepage:what_it_is')}></Hero>
        </Container>
      </Container>

      {/* How it works -  1 step */}
      <Container layout="wide" paddingBottom={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Column width={50} alignX="center">
            <div style={{ maxWidth: '460px' }}>
              <ImageIdentify />
            </div>
          </Column>
          <Column width={50}>
            <h3>{t('homepage:how.bloc1.title')}</h3>
            <p className="mt__M h3 h3__light">{t('homepage:how.bloc1.desc')}</p>
          </Column>
        </Container>
      </Container>

      {/* How it works -  2 step */}
      <Container layout="wide" paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Column width={50} mobileOrder={2}>
            <h3>{t('homepage:how.bloc2.title')}</h3>
            <p className="mt__M h3 h3__light">{t('homepage:how.bloc2.desc')}</p>
          </Column>
          <Column width={50} alignX="center" mobileOrder={1}>
            <div style={{ maxWidth: '420px' }}>
              <ImageArchive />
            </div>
          </Column>
        </Container>
      </Container>

      {/* How it works -  3 step */}
      <Container layout="wide" paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Column width={50} alignX="center">
            <div style={{ maxWidth: '440px' }}>
              <ImageDection />
            </div>
          </Column>
          <Column width={50}>
            <h3>{t('homepage:how.bloc3.title')}</h3>
            <p className="mt__M h3 h3__light">{t('homepage:how.bloc3.desc')}</p>
          </Column>
        </Container>
      </Container>

      {/* How it works -  4 step */}
      <Container layout="wide" paddingTop={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Column width={50} mobileOrder={2}>
            <h3>{t('homepage:how.bloc4.title')}</h3>
            <p className="mt__M h3 h3__light">{t('homepage:how.bloc4.desc')}</p>
            <p className="mt__L">
              <Link href="https://github.com/ambanum/OpenTermsArchive-versions/releases">
                <a target="_blank">
                  <Button>{t('homepage:how.bloc4.cta.label')}</Button>
                </a>
              </Link>
            </p>
          </Column>
          <Column width={50} alignX="center" alignY="center" mobileOrder={1}>
            <div style={{ maxWidth: '280px' }}>
              <ImagePublication />
            </div>
          </Column>
        </Container>
      </Container>

      {/* CTA public */}
      <Container layout="wide" gray={true} paddingY={false}>
        <Container gridCols="12" gridGutters="11" paddingX={false} gray={true}>
          <ButtonBlockList title={t('homepage:cta_public.title')}>
            <ButtonBlock
              title={t('homepage:cta_public.bloc1.title')}
              iconName="FiTwitter"
              iconColor="var(--colorPrimary)"
            >
              <Link href="/contribute">
                <Button>{t('homepage:cta_public.bloc1.button.label')}</Button>
              </Link>
              <LinkIcon iconColor="var(--colorBlack400)" href="/case-studies" small={true}>
                {t('homepage:cta_public.bloc1.link.label')}
              </LinkIcon>
            </ButtonBlock>
            <ButtonBlock
              title={t('homepage:cta_public.bloc2.title')}
              iconName="FiMail"
              iconColor="var(--colorPrimary)"
            >
              <Link href="/subscribe">
                <Button>{t('homepage:cta_public.bloc2.button.label')}</Button>
              </Link>
              <LinkIcon
                iconColor="var(--colorBlack400)"
                href="https://github.com/ambanum/OpenTermsArchive#by-rss"
                small={true}
              >
                {t('homepage:cta_public.bloc2.link.label')}
              </LinkIcon>
            </ButtonBlock>
            <ButtonBlock
              title={t('homepage:cta_public.bloc3.title')}
              iconName="FiGithub"
              iconColor="var(--colorPrimary)"
            >
              <Link href="https://opentermsarchive.org/data/api">
                <Button>{t('homepage:cta_public.bloc3.button.label')}</Button>
              </Link>
              <LinkIcon
                iconColor="var(--colorBlack400)"
                href="https://github.com/ambanum/OpenTermsArchive-versions/releases"
                small={true}
              >
                {t('homepage:cta_public.bloc3.link.label')}
              </LinkIcon>
            </ButtonBlock>
          </ButtonBlockList>
        </Container>
      </Container>

      {/* Reuses */}
      <Container gridCols="12" gridGutters="11" flex={true}>
        <CardList title={t('homepage:reuses.title')} subtitle={t('homepage:reuses.subtitle')}>
          <Card
            image="/images/scripta-manent.jpg"
            title={t('homepage:reuses.card1.title')}
            subtitle={t('homepage:reuses.card1.subtitle')}
            author={t('homepage:reuses.card1.author')}
          >
            <Link href="https://disinfo.quaidorsay.fr/fr/open-terms-archive/scripta-manent">
              <a target="_blank">
                <Button type="secondary">{t('homepage:reuses.card1.button.label')}</Button>
              </a>
            </Link>
          </Card>
          <Card
            image="/images/disinfo-experiments.jpg"
            title={t('homepage:reuses.card2.title')}
            subtitle={t('homepage:reuses.card2.subtitle')}
            author={t('homepage:reuses.card2.author')}
          >
            <Link href="https://disinfo.quaidorsay.fr/en/open-terms-archive/experiments">
              <a target="_blank">
                <Button type="secondary">{t('homepage:reuses.card2.button.label')}</Button>
              </a>
            </Link>
          </Card>
          <Card
            className="text__center"
            title={t('homepage:reuses.card3.title')}
            subtitle={t('homepage:reuses.card3.subtitle')}
          >
            <Link href="mailto:contact@opentermsarchive.org">
              <Button type="secondary">{t('homepage:reuses.card3.button.label')}</Button>
            </Link>
          </Card>
        </CardList>
      </Container>

      {/* Stats */}
      {/* FOSS & Contributors */}
      {/* Partners */}
      {/* Press */}

      {/* Contributors */}
      <Container gridCols="12" gridGutters="11" id={t('homepage:contribute.id', 'contribute')}>
        <Container gridCols="8" gridGutters="7" paddingY={false}>
          <Column width={100} alignX="center">
            <img src="/images/contribute.jpg" loading="lazy" />
          </Column>
        </Container>
        <Container gridCols="6" gridGutters="5" paddingYSmall={true}>
          <Contributors subtitle={t('homepage:contributors.subtitle', 'Thanks 🙏')} />
        </Container>
      </Container>

      {/* Partners */}
      <Container layout="fluid" gridCols="12" gridGutters="11" flex={true} paddingX={false}>
        <ThumbGalery
          title={t('homepage:partners.title', 'Our Partners')}
          subtitle={t('homepage:partners.subtitle', 'They make Open Terms Archive existing')}
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
          title={t('homepage:press.title', 'Press')}
          subtitle={t('homepage:press.subtitle', 'They talk about Open Terms Archive')}
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
