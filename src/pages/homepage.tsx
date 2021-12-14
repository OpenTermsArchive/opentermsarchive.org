import Button from 'modules/Common/components/Button';
import ButtonBlock from 'modules/Common/components/ButtonBlock';
import ButtonBlockList from 'modules/Common/components/ButtonBlockList';
import Card from 'modules/Common/components/Card';
import CardList from 'modules/Common/components/CardList';
import Column from 'modules/Common/components/Column';
import Container from 'modules/Common/containers/Container';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import Link from 'next/link';
import LinkIcon from 'modules/Common/components/LinkIcon';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
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
        <Container gridCols="11" gridGutters="10" paddingX={false}>
          <h2 className="text__center">{t('homepage:how.title')}</h2>
        </Container>
        <Container gridCols="11" gridGutters="10" flex={true} paddingX={false} paddingYSmall={true}>
          <Column width={50}>
            <h3>{t('homepage:how.bloc1.title')}</h3>
            <p className="mt__M h3 h3__light">{t('homepage:how.bloc1.desc')}</p>
          </Column>
          <Column width={50} alignX="right">
            <div style={{ maxWidth: '480px' }}>
              <img src="/images/step-1.png" />
            </div>
          </Column>
        </Container>
      </Container>
      {/* How it works -  2 step */}
      <Container layout="wide" paddingY={false}>
        <Container gridCols="11" gridGutters="10" flex={true} paddingX={false}>
          <Column width={50}>
            <h3>{t('homepage:how.bloc2.title')}</h3>
            <p className="mt__M h3 h3__light">{t('homepage:how.bloc2.desc')}</p>
          </Column>
          <Column width={50} alignX="right">
            <div style={{ maxWidth: '480px' }}>
              <img src="/images/step-2.png" />
            </div>
          </Column>
        </Container>
      </Container>
      {/* How it works -  3 step */}
      <Container layout="wide" paddingY={false}>
        <Container gridCols="11" gridGutters="10" flex={true} paddingX={false}>
          <Column width={50}>
            <h3>{t('homepage:how.bloc3.title')}</h3>
            <p className="mt__M h3 h3__light">{t('homepage:how.bloc3.desc')}</p>
          </Column>
          <Column width={50} alignX="right">
            <div style={{ maxWidth: '430px' }}>
              <img src="/images/step-3.png" />
            </div>
          </Column>
        </Container>
      </Container>
      {/* How it works -  4 step */}
      <Container layout="wide" paddingTop={false}>
        <Container gridCols="11" gridGutters="10" flex={true} paddingX={false}>
          <Column width={50}>
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
          <Column width={50} alignX="right" alignY="center">
            <div style={{ maxWidth: '350px' }}>
              <img src="/images/step-4.png" />
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
              iconColor="var(--colorBlack400)"
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
              iconColor="var(--colorBlack400)"
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
              iconColor="var(--colorBlack400)"
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
            image="/images/tosdr.jpg"
            title="Terms of Service; Didn’t Read"
            subtitle="Permet aux utilisateurs de donner collaborativement une note aux conditions d’utilisation selon le respect de leurs droits."
            author="ToS;DR"
            link="https://tosdr.org"
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
            image="/images/scripta-manent.jpg"
            title={t('homepage:reuses.card1.title')}
            subtitle={t('homepage:reuses.card1.subtitle')}
            author={t('homepage:reuses.card1.author')}
            link="https://disinfo.quaidorsay.fr/fr/open-terms-archive/scripta-manent"
            center={true}
          ></Card>

          <Card
            image="/images/tosback.jpg"
            title="TOSback"
            subtitle="L’ancêtre d’Open Terms Archive ! Depuis octobre 2020, les changements affichés sont fournis par une instance dédiée d’Open Terms Archive."
            author="ToS;DR & Electronic Frontier Foundation"
            link="https://tosback.org/"
            center={true}
          ></Card>
          <Card
            image="/images/new-reuse.jpg"
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
            <h2>{t('homepage:foss.title')}</h2>
            <h3 className="h3__light">{t('homepage:foss.subtitle')}</h3>
            <Link href="/about">
              <Button type="secondary">{t('homepage:foss.button.label')}</Button>
            </Link>
          </TextContent>
        </Container>
      </Container>
    </Layout>
  );
};

export const getStaticProps = withI18n()(async (props: any) => {
  return JSON.parse(JSON.stringify({ props: { ...props }, revalidate: 10 }));
});

export default HomePage;
