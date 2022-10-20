import withMdx, { WithMdxResult } from 'modules/I18n/hoc/withMdx';
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
import useTranslation from 'next-translate/useTranslation';

export default function MediaPage({ mdxContent }: WithMdxResult) {
  const { t } = useTranslation();
  return (
    <Layout title={t('media:seo.title')}>
      <Container layout="wide" paddingY={false} dark={true}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Hero title={t('media:hero.title')}></Hero>
        </Container>
      </Container>

      <Container gray={true} layout={'fluid'} paddingY={false}>
        <Container gridCols="9" gridGutters="8">
          <h2>{t('media:logo.title')}</h2>
          <h4 className="mt__3XL mb__M">{t('media:logo.mainversion.title')}</h4>
          <Container flex={true} paddingTop={false}>
            <Column width={50}>
              <ButtonBlock
                fillParent={true}
                white={true}
                desc={t('media:logo.white.background.desc')}
              >
                <Logo className="mb__L" />
                <Button>
                  <a download href="/images/logo/logo-open-terms-archive-black.png">
                    {t('media:logo.cta.label')}
                  </a>
                </Button>
                <a download href="/images/logo/logo-open-terms-archive-black.svg">
                  {t('media:logo.cta.svg.label')}
                </a>
              </ButtonBlock>
            </Column>
            <Column width={50}>
              <ButtonBlock
                fillParent={true}
                desc={t('media:logo.black.background.desc')}
                dark={true}
              >
                <Logo backgroundType="black" className="mb__L" />
                <Button>
                  <a download href="/images/logo/logo-open-terms-archive-white.png">
                    {t('media:logo.cta.label')}
                  </a>
                </Button>
                <a download href="/images/logo/logo-open-terms-archive-white.svg">
                  {t('media:logo.cta.svg.label')}
                </a>
              </ButtonBlock>
            </Column>
          </Container>
          <h4 className="mt__L mb__M">{t('media:logo.alternativeversion.title')}</h4>
          <Container flex={true} paddingTop={false}>
            <Column width={50}>
              <ButtonBlock
                fillParent={true}
                white={true}
                desc={t('media:logo.white.background.desc')}
              >
                <Logo className="mb__L" type="alternative" />
                <Button>
                  <a download href="/images/logo/logo-open-terms-archive-black-alternative.png">
                    {t('media:logo.cta.label')}
                  </a>
                </Button>
                <a download href="/images/logo/logo-open-terms-archive-black-alternative.svg">
                  {t('media:logo.cta.svg.label')}
                </a>
              </ButtonBlock>
            </Column>
            <Column width={50}>
              <ButtonBlock
                fillParent={true}
                desc={t('media:logo.black.background.desc')}
                dark={true}
              >
                <Logo backgroundType="black" className="mb__L" type="alternative" />
                <Button>
                  <a download href="/images/logo/logo-open-terms-archive-white-alternative.png">
                    {t('media:logo.cta.label')}
                  </a>
                </Button>
                <a download href="/images/logo/logo-open-terms-archive-white-alternative.svg">
                  {t('media:logo.cta.svg.label')}
                </a>
              </ButtonBlock>
            </Column>
          </Container>
        </Container>
      </Container>

      <Container gridCols="8" gridGutters="7" flex={true}>
        <Article title={t('media:press.title')} subtitle={t('media:press.subtitle')}>
          <TextContent marginTopLarge={true}>
            <MDXRemote {...(mdxContent as any)} components={{ Button: Button }} />
          </TextContent>
        </Article>
      </Container>
    </Layout>
  );
}

export const getStaticProps = withMdx({ load: 'mdx', filename: 'media', folder: 'static' })();
