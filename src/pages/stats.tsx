import withMdx, { WithMdxResult } from 'modules/I18n/hoc/withMdx';
import ButtonBlock from 'modules/Common/components/ButtonBlock';
import ButtonBlockList from 'modules/Common/components/ButtonBlockList';
import Container from 'modules/Common/containers/Container';
import Layout from 'modules/Common/containers/Layout';
import LinkIcon from 'modules/Common/components/LinkIcon';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import { useTranslation } from 'modules/I18n';

export default function StatsPage({ mdxContent }: WithMdxResult) {
  const { t } = useTranslation();
  const { frontmatter = {} } = mdxContent || {};
  return (
    <Layout
      title={frontmatter['html_title'] ?? frontmatter['title'] ?? frontmatter['hero.title']}
      desc={frontmatter['html_description'] ?? frontmatter['hero.subtitle']}
    >
      <Container gridCols="10" gridGutters="9">
        <TextContent>
          {frontmatter.title && <h1>{frontmatter.title}</h1>}
          {mdxContent && <MDXRemote {...mdxContent} components={{ LinkIcon }} />}
        </TextContent>
      </Container>
      <Container layout="wide" paddingY={false}>
        <Container gridCols="12" gridGutters="11" paddingX={false} paddingYSmall={true}>
          <ButtonBlockList title={t('stats:numbers.title')}>
            <ButtonBlock
              title={t('stats:numbers.block1.title')}
              desc={t('stats:numbers.block1.desc')}
              iconName="FiGlobe"
              iconColor="var(--colorBlack400)"
            />
            <ButtonBlock
              title={t('stats:numbers.block2.title')}
              desc={t('stats:numbers.block2.desc')}
              iconName="FiFile"
              iconColor="var(--colorBlack400)"
            />
            <ButtonBlock
              title={t('stats:numbers.block3.title')}
              desc={t('stats:numbers.block3.desc')}
              iconName="FiEye"
              iconColor="var(--colorBlack400)"
            />
            <ButtonBlock
              title={t('stats:numbers.block4.title')}
              desc={t('stats:numbers.block4.desc')}
              iconName="FiUsers"
              iconColor="var(--colorBlack400)"
            />
            <ButtonBlock
              title={t('stats:numbers.block5.title')}
              desc={t('stats:numbers.block5.desc')}
              iconName="FiLayers"
              iconColor="var(--colorBlack400)"
            />
            <ButtonBlock
              title={t('stats:numbers.block6.title')}
              desc={t('stats:numbers.block6.desc')}
              iconName="FiFlag"
              iconColor="var(--colorBlack400)"
            ></ButtonBlock>
          </ButtonBlockList>
        </Container>
      </Container>
    </Layout>
  );
}

export const getStaticProps = withMdx({ filename: 'stats', folder: 'parts' })();
