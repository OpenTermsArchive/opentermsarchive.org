import { WithI18nResult, withI18n } from 'modules/I18n';

import Article from 'modules/Common/components/Article';
import Button from 'modules/Common/components/Button';
import ButtonBlock from 'modules/Common/components/ButtonBlock';
import Column from 'modules/Common/components/Column';
import Container from 'modules/Common/containers/Container';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import Logo from 'modules/Common/components/Logo';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import { useTranslation } from 'next-i18next';

export default function MediaPage({ mdxContent }: WithI18nResult) {
  const { t } = useTranslation(['common', 'media']);
  return (
    <Layout title={t('seo.title', { ns: 'media' })}>
      <Container layout="wide" paddingY={false} dark={true}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Hero title={t('hero.title', { ns: 'media' })}></Hero>
        </Container>
      </Container>

      <Container gray={true} layout={'fluid'} paddingY={false}>
        <Container gridCols="10" gridGutters="9">
          <h2>{t('logo.title', 'Logo', { ns: 'media' })}</h2>
          <Container flex={true} paddingYSmall={true}>
            <Column width={50}>
              <ButtonBlock
                fillParent={true}
                white={true}
                desc={t('logo.white.background.desc', { ns: 'media' })}
              >
                <Logo size="full" />
                <Button>
                  <a download href="/images/logo/logo-open-terms-archive-black.png">
                    {t('logo.cta.label', { ns: 'media' })}
                  </a>
                </Button>
                <a download href="/images/logo/logo-open-terms-archive-black.svg">
                  {t('logo.cta.svg.label', { ns: 'media' })}
                </a>
              </ButtonBlock>
            </Column>
            <Column width={50}>
              <ButtonBlock
                fillParent={true}
                desc={t('logo.black.background.desc', { ns: 'media' })}
                dark={true}
              >
                <Logo backgroundType="black" size="full" />
                <Button>
                  <a download href="/images/logo/logo-open-terms-archive-white.png">
                    {t('logo.cta.label', { ns: 'media' })}
                  </a>
                </Button>
                <a download href="/images/logo/logo-open-terms-archive-white.svg">
                  {t('logo.cta.svg.label', { ns: 'media' })}
                </a>
              </ButtonBlock>
            </Column>
          </Container>
        </Container>
      </Container>

      <Container gridCols="8" gridGutters="7" flex={true}>
        <Article
          title={t('press.title', { ns: 'media' })}
          subtitle={t('press.subtitle', { ns: 'media' })}
        >
          <TextContent marginTopLarge={true}>
            <MDXRemote {...(mdxContent as any)} components={{ Button: Button }} />
          </TextContent>
        </Article>
      </Container>
    </Layout>
  );
}

export const getStaticProps = withI18n({ load: 'mdx', filename: 'media' })();
