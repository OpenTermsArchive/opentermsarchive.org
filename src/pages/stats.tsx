import { WithI18nResult, withI18n } from 'modules/I18n';

import Button from 'modules/Common/components/Button';
import ButtonBlock from 'modules/Common/components/ButtonBlock';
import ButtonBlockList from 'modules/Common/components/ButtonBlockList';
import Card from 'modules/Common/components/Card';
import CardList from 'modules/Common/components/CardList';
import Container from 'modules/Common/containers/Container';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import Link from 'next/link';
import LinkIcon from 'modules/Common/components/LinkIcon';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import { useTranslation } from 'next-i18next';

export default function StatsPage({ mdxContent }: WithI18nResult) {
  const { t } = useTranslation();
  return (
    <Layout title={t('stats:seo.title')}>
      <Container layout="wide" paddingY={false} dark={true}>
        <Container gridCols="12" gridGutters="11" paddingX={false} paddingY={false}>
          <Container gridCols="9" gridGutters="8" flex={true} paddingX={false} alignX="left">
            <Hero title={t('stats:hero.title')} subtitle={t('stats:hero.subtitle')}></Hero>
          </Container>
        </Container>
      </Container>
      <Container gridCols="10" gridGutters="9">
        <TextContent>
          <MDXRemote {...(mdxContent as any)} components={{ LinkIcon }} />
        </TextContent>
      </Container>
      <Container layout="wide" gray={true} paddingY={false}>
        <Container gridCols="12" gridGutters="11" paddingX={false}>
          <ButtonBlockList title="Quelques chiffres">
            <ButtonBlock
              title="418 services"
              desc="répartis sur plusieurs industries, langues et juridictions."
              iconName="FiFolder"
              iconColor="var(--colorBlack400)"
              white={true}
            ></ButtonBlock>
            <ButtonBlock
              desc="qui utilise une ontologie d'une cinquantème de types."
              title="956 documents"
              iconName="FiFile"
              iconColor="var(--colorBlack400)"
              white={true}
            ></ButtonBlock>
            <ButtonBlock
              desc="publiées sous forme de brèves et de tweets."
              title="370 analyses"
              iconName="FiEye"
              iconColor="var(--colorBlack400)"
              white={true}
            ></ButtonBlock>
            <ButtonBlock
              desc="qui permettent à Open Terms Archive d'exister"
              title="23 contributeurs"
              iconName="FiUsers"
              iconColor="var(--colorBlack400)"
              white={true}
            ></ButtonBlock>
            <ButtonBlock
              desc="des outils et données produit par Open Terms Archive"
              title="5 réutilisations"
              iconName="FiDatabase"
              iconColor="var(--colorBlack400)"
              white={true}
            ></ButtonBlock>
          </ButtonBlockList>
        </Container>
      </Container>
      <Container gridCols="12" gridGutters="11">
        <CardList title="4 instances" small={true} centerTitle={true}>
          <Card
            className="text__center"
            title="Contrib"
            subtitle="285 services et 612 documents"
            link="https://github.com/OpenTermsArchive/contrib-versions/"
            center={true}
            author="Non maintenue"
          >
            Services variés en anglais.
          </Card>
          <Card
            className="text__center"
            title="France"
            subtitle="104 services et 206 documents"
            link="https://github.com/OpenTermsArchive/france-versions"
            center={true}
            author="UFC Que Choisir"
          >
            Services variés en français et dans la juridiction française.
          </Card>
          <Card
            className="text__center"
            title="France Élections"
            subtitle="5 services et 75 documents"
            link="https://github.com/OpenTermsArchive/contrib-versions/"
            center={true}
            author="Reset"
          >
            Services en ligne des grands médias utilisés en France, en français et dans la
            juridiction française pendant l'élection présidentielle française de 2022.
          </Card>
          <Card
            className="text__center"
            title="Dating"
            subtitle="24 services et 52 documents"
            link="https://github.com/OpenTermsArchive/dating-versions"
            center={true}
            author="HestiaLabs"
          >
            Services de rencontres utilisés en Europe, en anglais et dans les juridictions de
            l'Union européenne et de la Suisse.
          </Card>
        </CardList>
      </Container>
    </Layout>
  );
}

export const getStaticProps = withI18n({ load: 'mdx', filename: 'stats' })();
