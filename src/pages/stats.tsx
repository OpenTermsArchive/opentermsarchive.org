import { Trans, useTranslation } from 'next-i18next';
import { WithI18nResult, withI18n } from 'modules/I18n';

import ButtonBlock from 'modules/Common/components/ButtonBlock';
import ButtonBlockList from 'modules/Common/components/ButtonBlockList';
import Card from 'modules/Common/components/Card';
import CardList from 'modules/Common/components/CardList';
import Container from 'modules/Common/containers/Container';
import Layout from 'modules/Common/containers/Layout';
import LinkIcon from 'modules/Common/components/LinkIcon';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';

export default function StatsPage({ mdxContent }: WithI18nResult) {
  const { t } = useTranslation();
  return (
    <Layout title={t('stats:seo.title')}>
      <Container gridCols="10" gridGutters="9">
        <TextContent>
          <MDXRemote {...(mdxContent as any)} components={{ LinkIcon }} />
        </TextContent>
      </Container>
      <Container layout="wide" gray={true} paddingY={false}>
        <Container gridCols="12" gridGutters="11" paddingX={false} paddingYSmall={true}>
          <ButtonBlockList title={t('stats:numbers.title')}>
            <ButtonBlock
              title={t('stats:numbers.block1.title')}
              desc={t('stats:numbers.block1.desc')}
              iconName="FiGlobe"
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
              iconName="FiLayers"
              iconColor="var(--colorBlack400)"
              white={true}
            ></ButtonBlock>
            <ButtonBlock
              title={t('stats:numbers.block6.title')}
              desc={t('stats:numbers.block6.desc')}
              iconName="FiFlag"
              iconColor="var(--colorBlack400)"
              white={true}
            ></ButtonBlock>
          </ButtonBlockList>
        </Container>
      </Container>
      <Container gridCols="12" gridGutters="11">
        <CardList title={t('stats:instances.title')} small={true} centerTitle={true}>
          <Card
            title={t('stats:instances.contrib.title')}
            subtitle={<Trans i18nKey={'stats:instances.contrib.subtitle'}></Trans>}
            author={t('stats:instances.contrib.author')}
            className="text__center"
            link="https://github.com/OpenTermsArchive/contrib-versions/"
            center={true}
            image="/images/instances/contrib.png"
            small={true}
          >
            {t('stats:instances.contrib.desc')}
          </Card>
          <Card
            title={t('stats:instances.france.title')}
            subtitle={<Trans i18nKey={'stats:instances.france.subtitle'}></Trans>}
            author={t('stats:instances.france.author')}
            className="text__center"
            link="https://github.com/OpenTermsArchive/france-versions"
            center={true}
            image="/images/instances/france.png"
            small={true}
          >
            {t('stats:instances.france.desc')}
          </Card>
          <Card
            title={t('stats:instances.france-elections.title')}
            subtitle={<Trans i18nKey={'stats:instances.france-elections.subtitle'}></Trans>}
            author={t('stats:instances.france-elections.author')}
            className="text__center"
            link="https://github.com/OpenTermsArchive/france-elections-versions/"
            center={true}
            image="/images/instances/france-elections.png"
            small={true}
          >
            {t('stats:instances.france-elections.desc')}
          </Card>
          <Card
            title={t('stats:instances.dating.title')}
            subtitle={<Trans i18nKey={'stats:instances.dating.subtitle'}></Trans>}
            author={t('stats:instances.dating.author')}
            className="text__center"
            link="https://github.com/OpenTermsArchive/dating-versions"
            center={true}
            image="/images/instances/dating.png"
            small={true}
          >
            {t('stats:instances.dating.desc')}
          </Card>
        </CardList>
      </Container>
    </Layout>
  );
}

export const getStaticProps = withI18n({ load: 'mdx', filename: 'stats' })();
