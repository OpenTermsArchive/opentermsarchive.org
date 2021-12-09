import Button from 'modules/Common/components/Button';
import ButtonBlock from 'modules/Common/components/ButtonBlock';
import ButtonBlockList from 'modules/Common/components/ButtonBlockList';
import Card from 'modules/Common/components/Card';
import CardList from 'modules/Common/components/CardList';
import Column from 'modules/Common/components/Column';
import Container from 'modules/Common/containers/Container';
import Hero from 'modules/Common/components/Hero';
import ImageArchive from '../../public/images/archive.svg';
import ImageDection from '../../public/images/detection.svg';
import ImageIdentify from '../../public/images/identify.svg';
import ImagePublication from '../../public/images/publication.svg';
import Layout from 'modules/Common/containers/Layout';
import Link from 'next/link';
import LinkIcon from 'modules/Common/components/LinkIcon';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import ThumbGalery from 'modules/Common/components/ThumbGalery';
import ThumbGaleryItem from 'modules/Common/components/ThumbGaleryItem';
import { useTranslation } from 'next-i18next';
import { withI18n } from 'modules/I18n';

const HomePage = () => {
  const { t } = useTranslation();

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
              Facebook déclaration de service sans le filter, avec TOS et privacy policy
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
              Log de la console 'Facebook updated ...'
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
              https://github.com/ambanum/OpenTermsArchive-versions/commit/80d0a20ba6f01994cf9637ca315113e13c717e4f?short_path=e43a595#diff-e43a59590f4f051a818725f7b8453d6db4b26ce8ad524d71bc8d8293d72bc28c
              Passage sur la reco faciale, diff unifié
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
              Screnshot du système de fichier du dataset, garder facebook privacy policy
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
      <Container gridCols="12" gridGutters="11">
        <CardList title={t('homepage:reuses.title')} subtitle={t('homepage:reuses.subtitle')}>
          <Card
            image="/images/scripta-manent.jpg"
            title={t('homepage:reuses.card1.title')}
            subtitle={t('homepage:reuses.card1.subtitle')}
            author={t('homepage:reuses.card1.author')}
            link="https://disinfo.quaidorsay.fr/fr/open-terms-archive/scripta-manent"
            center={true}
          ></Card>
          <Card
            image="/images/disinfo-experiments.jpg"
            title={t('homepage:reuses.card2.title')}
            subtitle={t('homepage:reuses.card2.subtitle')}
            author={t('homepage:reuses.card2.author')}
            link="https://disinfo.quaidorsay.fr/en/open-terms-archive/experiments"
            center={true}
          ></Card>
          <Card
            image="/images/unknow.jpg"
            className="text__center"
            title={t('homepage:reuses.card3.title')}
            subtitle={t('homepage:reuses.card3.subtitle')}
            link="mailto:contact@opentermsarchive.org"
            center={true}
          ></Card>
        </CardList>
      </Container>

      {/* FOSS & Contributors */}
      <Container gray={true} layout="wide">
        <Container gridCols="12" gridGutters="11" paddingY={false}>
          <TextContent className="">
            <h2>Commun contributif</h2>
            <h3 className="h3__light">
              Open Terms Archive est un logiciel libre et ouvert. Toute entité peut le réutiliser et
              le modifier librement, sous seule condition de partager ses améliorations avec la
              communauté qui le construit. Le produit est construit collaborativement par toutes les
              entités qui l'utilisent et y contribuent.
            </h3>
            <Link href="/about">
              <Button type="secondary">En savoir plus</Button>
            </Link>
          </TextContent>
          <ThumbGalery>
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
            <Link href="https://www.peren.gouv.fr/">
              <a target="_blank">
                <ThumbGaleryItem src="/images/logo-peren.png" width="150" height="121" />
              </a>
            </Link>
          </ThumbGalery>
        </Container>
      </Container>
    </Layout>
  );
};

export const getStaticProps = withI18n()(async (props: any) => {
  return JSON.parse(JSON.stringify({ props: { ...props }, revalidate: 10 }));
});

export default HomePage;
