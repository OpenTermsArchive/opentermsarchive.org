import { WithI18nResult, withI18n } from 'modules/I18n';

import ButtonBlock from 'modules/Common/components/ButtonBlock';
import ButtonBlockList from 'modules/Common/components/ButtonBlockList';
import Card from 'modules/Common/components/Card';
import CardList from 'modules/Common/components/CardList';
import Container from 'modules/Common/containers/Container';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
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
          <ButtonBlockList title={t('stats:numbers.title')}>
            <ButtonBlock
              title={t('stats:numbers.block1.title')}
              desc={t('stats:numbers.block1.desc')}
              iconName="FiFolder"
              iconColor="var(--colorBlack400)"
              white={true}
            ></ButtonBlock>
            <ButtonBlock
              title={t('stats:numbers.block2.title')}
              desc={t('stats:numbers.block2.desc')}
              iconName="FiFile"
              iconColor="var(--colorBlack400)"
              white={true}
            ></ButtonBlock>
            <ButtonBlock
              title={t('stats:numbers.block3.title')}
              desc={t('stats:numbers.block3.desc')}
              iconName="FiEye"
              iconColor="var(--colorBlack400)"
              white={true}
            ></ButtonBlock>
            <ButtonBlock
              title={t('stats:numbers.block4.title')}
              desc={t('stats:numbers.block4.desc')}
              iconName="FiUsers"
              iconColor="var(--colorBlack400)"
              white={true}
            ></ButtonBlock>
            <ButtonBlock
              title={t('stats:numbers.block5.title')}
              desc={t('stats:numbers.block5.desc')}
              iconName="FiDatabase"
              iconColor="var(--colorBlack400)"
              white={true}
            ></ButtonBlock>
          </ButtonBlockList>
        </Container>
      </Container>
      <Container gridCols="12" gridGutters="11">
        <CardList title={t('stats:instances.title')} small={true} centerTitle={true}>
          <Card
            title={t('stats:instances.block1.title')}
            subtitle={t('stats:instances.block1.subtitle')}
            author={t('stats:instances.block1.author')}
            className="text__center"
            link="https://github.com/OpenTermsArchive/contrib-versions/"
            center={true}
            image="/images/instances/contrib.png"
            small={true}
          >
            {t('stats:instances.block1.desc')}
          </Card>
          <Card
            title={t('stats:instances.block2.title')}
            subtitle={t('stats:instances.block2.subtitle')}
            author={t('stats:instances.block2.author')}
            className="text__center"
            link="https://github.com/OpenTermsArchive/france-versions"
            center={true}
            image="/images/instances/france.png"
            small={true}
          >
            {t('stats:instances.block2.desc')}
          </Card>
          <Card
            title={t('stats:instances.block3.title')}
            subtitle={t('stats:instances.block3.subtitle')}
            author={t('stats:instances.block3.author')}
            className="text__center"
            link="https://github.com/OpenTermsArchive/contrib-versions/"
            center={true}
            image="/images/instances/france-elections.png"
            small={true}
          >
            {t('stats:instances.block3.desc')}
          </Card>
          <Card
            title={t('stats:instances.block4.title')}
            subtitle={t('stats:instances.block4.subtitle')}
            author={t('stats:instances.block4.author')}
            className="text__center"
            link="https://github.com/OpenTermsArchive/dating-versions"
            center={true}
            image="/images/instances/dating.png"
            small={true}
          >
            {t('stats:instances.block4.desc')}
          </Card>
        </CardList>
      </Container>
    </Layout>
  );
}

export const getStaticProps = withI18n({ load: 'mdx', filename: 'stats' })();
