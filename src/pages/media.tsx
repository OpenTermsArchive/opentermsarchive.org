import { WithMdxResult, loadMdxFile } from 'modules/I18n/hoc/withMdx';

import Button from 'modules/Common/components/Button';
import ButtonBlock from 'modules/Common/components/ButtonBlock';
import Column from 'modules/Common/components/Column';
import Container from 'modules/Common/containers/Container';
import type { GetStaticProps } from 'next';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import Logo from 'modules/Common/components/Logo';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import { useTranslation } from 'modules/I18n';

const STATIC_PAGES_PATH = 'parts';

export default function MediaPage({ mdxContent }: WithMdxResult) {
  const { frontmatter = {} } = mdxContent || {};
  const { t } = useTranslation();

  return (
    <Layout title={frontmatter['title']} desc={frontmatter['description']}>
      <Container layout="wide" paddingY={false} dark={true}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Hero title={frontmatter['title']}></Hero>
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

      <Container paddingTop={false}>
        <Container gridCols="9" gridGutters="8">
          <TextContent>
            {mdxContent && <MDXRemote {...mdxContent} components={{ Button: Button }} />}
          </TextContent>
        </Container>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (props) => {
  const mdxContent = await loadMdxFile(
    {
      filename: 'media',
      folder: STATIC_PAGES_PATH,
    },
    props.locale
  );

  if (!mdxContent) {
    return { notFound: true };
  }

  return { props: { mdxContent } };
};
