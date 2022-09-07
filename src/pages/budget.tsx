import { WithI18nResult, withI18n } from 'modules/I18n';

import Container from 'modules/Common/containers/Container';
import Layout from 'modules/Common/containers/Layout';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import dynamic from 'next/dynamic';
import TextContent from 'modules/Common/components/TextContent';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const TotalExpendituresGraph = dynamic(
  () => import('modules/Common/components/TotalExpendituresGraph'),
  { ssr: false }
);
const FundingSourcesGraph = dynamic(() => import('modules/Common/components/FundingSourcesGraph'), {
  ssr: false,
});

const expenses = {
  '2020-06-01': 20164,
  '2020-07-01': 21061,
  '2020-08-01': 24755,
  '2020-09-01': 16682,
  '2020-10-01': 30325,
  '2020-11-01': 21116,
  '2020-12-01': 23322,
  '2021-01-01': 3045,
  '2021-02-01': 3045,
  '2021-03-01': 11566,
  '2021-04-01': 14430,
  '2021-05-01': 12045,
  '2021-06-01': 12483,
  '2021-07-01': 10803,
  '2021-08-01': 12390,
  '2021-09-01': 14839,
  '2021-10-01': 42231,
  '2021-11-01': 32106,
  '2021-12-01': 13784,
  '2022-01-01': 914,
  '2022-02-01': 10946,
  '2022-03-01': 45202,
  '2022-04-01': 25530,
  '2022-05-01': 37457,
  '2022-06-01': 30765,
};

const totalExpendituresData: any = [];
let accumulatedExpenditures = 0;

Object.entries(expenses).forEach(([month, expendituresThisMonth]) => {
  accumulatedExpenditures += expendituresThisMonth;
  totalExpendituresData.push({
    x: dayjs(month).toDate(),
    y: accumulatedExpenditures,
  });
});

export default function BudgetPage({ mdxContent }: WithI18nResult) {
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
export const getStaticProps = withI18n({ load: 'mdx', filename: 'budget' })();
