import Container from 'modules/Common/containers/Container';
import Layout from 'modules/Common/containers/Layout';
import withMdx, { WithMdxResult } from 'modules/I18n/hoc/withMdx';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import dynamic from 'next/dynamic';
import TextContent from 'modules/Common/components/TextContent';
import { useRouter } from 'next/router';
import { useTranslation } from 'modules/I18n';
import { buildExpensesData, ExpensesData } from 'pages/api/ota/expenses';

const TotalExpendituresGraph = dynamic(
  () => import('modules/Common/components/TotalExpendituresGraph'),
  { ssr: false }
);
const FundingSourcesGraph = dynamic(() => import('modules/Common/components/FundingSourcesGraph'), {
  ssr: false,
});

export default function BudgetPage({
  mdxContent,
  expenses,
  totalExpendituresData,
  accumulatedExpenditures,
}: WithMdxResult & ExpensesData) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Layout title={t('budget:seo.title')}>
      <Container gridCols="10" gridGutters="9">
        <TextContent>
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
              accumulatedExpenditures: () => accumulatedExpenditures.toLocaleString(router.locale),
              months: () => (Object.entries(expenses).length - 1).toString(),
            }}
          />
        </TextContent>
      </Container>
    </Layout>
  );
}

export const getStaticProps = withMdx({ load: 'mdx', filename: 'budget', folder: 'parts' })(
  (props: any) => ({
    props: {
      ...props,
      ...buildExpensesData(),
    },
  })
);
