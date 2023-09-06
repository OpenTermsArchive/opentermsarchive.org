import Container from 'modules/Common/containers/Container';
import Layout from 'modules/Common/containers/Layout';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import Collections from 'modules/Common/components/Collections';
import withMdx, { WithMdxResult } from 'modules/I18n/hoc/withMdx';
import { useTranslation } from 'modules/I18n';

export default function DatasetsPage({ mdxContent }: WithMdxResult) {
  const { frontmatter = {} } = mdxContent || {};
  const { t } = useTranslation();
  return (
    <Layout
      title={frontmatter['html_title'] ?? frontmatter['title'] ?? frontmatter['hero.title']}
      desc={frontmatter['html_description'] ?? frontmatter['hero.subtitle']}
    >
      <Container paddingTop={false}>
        <Container
          gridCols={frontmatter['grid.cols'] || 10}
          gridGutters={frontmatter['grid.gutters'] || 9}
          paddingBottom={false}
        >
          <TextContent>
            {frontmatter.title && <h1>{frontmatter.title}</h1>}
            <div dangerouslySetInnerHTML={{ __html: t('datasets:introduction') }} />
          </TextContent>
        </Container>
      </Container>
      <Container gray={false} layout="wide" paddingX={false} paddingTop={false} id="collections">
        <Container gridCols="12" gridGutters="11" paddingY={false}>
          <Collections subtitleLevel="h5" withPlaceholder={false} cardLink="datasets" />
        </Container>
      </Container>
      <Container paddingTop={false}>
        <Container
          gridCols={frontmatter['grid.cols'] || 10}
          gridGutters={frontmatter['grid.gutters'] || 9}
          paddingTop={false}
        >
          <TextContent>
            <h2>{frontmatter.related_datasets.title}</h2>
            <ul>
              {frontmatter.related_datasets.datasets.map((relatedDataset: any) => {
                return (
                  <li key={relatedDataset.name}>
                    <a href={relatedDataset.website} target="_blank">
                      {relatedDataset.name}
                    </a>
                    <br />
                    {relatedDataset.description}
                  </li>
                );
              })}
            </ul>
          </TextContent>
        </Container>
      </Container>
    </Layout>
  );
}

export const getStaticProps = withMdx({ filename: 'datasets', folder: 'parts' })((props: any) => ({
  props: {
    ...props,
  },
}));
