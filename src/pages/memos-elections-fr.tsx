import { WithI18nResult, withI18n } from 'modules/I18n';

import Button from 'modules/Common/components/Button';
import ButtonBlock from 'modules/Common/components/ButtonBlock';
import Container from 'modules/Common/containers/Container';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import { useTranslation } from 'next-i18next';

export default function memosElectionsFrPage({ mdxContent }: WithI18nResult) {
  const { t } = useTranslation();
  return (
    <Layout title={t('memos-elections-fr:seo.title')} desc={t('memos-elections-fr:seo.desc')}>
      <Container layout="wide" paddingY={false} dark={true}>
        <Container gridCols="12" gridGutters="11" paddingX={false} paddingY={false}>
          <Container gridCols="9" gridGutters="8" flex={true} paddingX={false} alignX="left">
            <Hero
              title={t('memos-elections-fr:hero.title')}
              subtitle={t('memos-elections-fr:hero.subtitle')}
            ></Hero>
          </Container>
        </Container>
      </Container>
      <Container gridCols="10" gridGutters="9">
        <TextContent>
          <MDXRemote
            {...(mdxContent as any)}
            components={{ Button: Button, ButtonBlock: ButtonBlock, Link: Link }}
          />
        </TextContent>
      </Container>
    </Layout>
  );
}

export const getStaticProps = withI18n({
  load: 'mdx',
  filename: 'memos-elections-fr',
})();
