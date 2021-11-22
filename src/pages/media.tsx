import { WithI18nResult, withI18n } from 'modules/I18n';

import Article from 'modules/Common/components/Article';
import Button from 'modules/Common/components/Button';
import ButtonBlock from 'modules/Common/components/ButtonBlock';
import Column from 'modules/Common/components/Column';
import Container from 'modules/Common/containers/Container';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import LinkIcon from 'modules/Common/components/LinkIcon';
import Logo from 'modules/Common/components/Logo';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import { useTranslation } from 'next-i18next';

export default function MediaPage({ mdxContent }: WithI18nResult) {
  const { t } = useTranslation('common');
  return (
    <Layout title={t('common:media.seo.title', 'Media')}>
      <Container layout="wide" paddingY={false} dark={true}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Hero title={t('common:media.hero.title', 'Media')}></Hero>
        </Container>
      </Container>

      <Container gray={true} layout={'fluid'} paddingY={false}>
        <Container gridCols="10" gridGutters="9">
          <h2>{t('common:media.logo.title', 'Logo')}</h2>
          <Container flex={true} paddingYSmall={true}>
            <Column width={50}>
              <ButtonBlock
                fillParent={true}
                white={true}
                desc={t('common:media.logo.white.background.desc', 'For white background')}
              >
                <Logo size="full" />
                <Button>
                  <a download href="/images/logo/logo-open-terms-archive-black.png">
                    {t('common:media.logo.cta.label', 'Download the .png')}
                  </a>
                </Button>
                <a download href="/images/logo/logo-open-terms-archive-black.svg">
                  {t('common:media.logo.cta.svg.label', 'or the .svg')}
                </a>
              </ButtonBlock>
            </Column>
            <Column width={50}>
              <ButtonBlock
                fillParent={true}
                desc={t(
                  'common:media.logo.black.background.desc',
                  'PNG file in high definition for dark background'
                )}
                dark={true}
              >
                <Logo backgroundType="black" size="full" />
                <Button>
                  <a download href="/images/logo/logo-open-terms-archive-white.png">
                    {t('common:media.logo.cta.label', 'Download the .png')}
                  </a>
                </Button>
                <a download href="/images/logo/logo-open-terms-archive-white.svg">
                  {t('common:media.logo.cta.svg.label', 'or the .svg')}
                </a>
              </ButtonBlock>
            </Column>
          </Container>
        </Container>
      </Container>

      <Container gridCols="10" gridGutters="9" flex={true}>
        <Article
          title={t('common:media.press.title', 'Press review')}
          subtitle={t('common:media.press.subtitle', 'They talk about the Open Terms Archive')}
        >
          <TextContent>
            <MDXRemote {...(mdxContent as any)} components={{ Button: Button }} />
          </TextContent>
        </Article>
      </Container>
    </Layout>
  );
}

export const getStaticProps = withI18n({ load: 'mdx', filename: 'media' })();
