import { ExpensesData, buildExpensesData } from 'pages/api/ota/expenses';
import withMdx, { WithMdxResult } from 'modules/I18n/hoc/withMdx';

import Container from 'modules/Common/containers/Container';
import Layout from 'modules/Common/containers/Layout';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const TotalExpendituresGraph = dynamic(
  () => import('modules/Common/components/TotalExpendituresGraph'),
  { ssr: false }
);
const FundingSourcesGraph = dynamic(() => import('modules/Common/components/FundingSourcesGraph'), {
  ssr: false,
});

export default function BudgetPage({
  mdxContent,
  totalExpendituresData,
}: WithMdxResult & ExpensesData) {
  const { frontmatter = {} } = mdxContent || {};
  const router = useRouter();

  return (
    <Layout
      title={frontmatter['html_title'] ?? frontmatter['title'] ?? frontmatter['hero.title']}
      desc={frontmatter['html_description'] ?? frontmatter['hero.subtitle']}
    >
      <Container gridCols="12" gridGutters="11">
        <TextContent>
          {frontmatter.title && <h1 className="mb__0">{frontmatter.title}</h1>}
          <MDXRemote
            {...(mdxContent as any)}
            components={{
              TotalExpendituresGraph: () => (
                <TotalExpendituresGraph
                  data={[
                    {
                      id: 'cost per month',
                      data: totalExpendituresData,
                    },
                  ]}
                />
              ),
              FundingSourcesGraph,
            }}
          />
        </TextContent>
      </Container>
    </Layout>
  );
}

export const getStaticProps = withMdx({ filename: 'budget', folder: 'parts' })((props: any) => ({
  props: {
    ...props,
    ...buildExpensesData(),
  },
}));
