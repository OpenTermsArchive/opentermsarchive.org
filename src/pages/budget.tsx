import { WithI18nResult, withI18n } from 'modules/I18n';

import Container from 'modules/Common/containers/Container';
import Layout from 'modules/Common/containers/Layout';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import TextContent from 'modules/Common/components/TextContent';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const graphLineTheme = {
  textColor: 'var(--colorBlack600)',
  fontSize: 12,
  axis: {
    domain: {
      line: {
        stroke: 'var(--colorBlack400)',
        strokeWidth: 1,
      },
    },
    ticks: {
      line: {
        stroke: 'var(--colorBlack200)',
        strokeWidth: 1,
      },
    },
  },
  grid: {
    line: {
      stroke: 'var(--colorBlack200)',
      strokeWidth: 1,
    },
  },
};

const graphPieColors = [
  'var(--colorPrimary)',
  'hsl(205,80%,65%)',
  'hsl(205,60%,70%)',
  'hsl(205,40%,75%)',
];

const graphLineColors = ['var(--colorPrimary)'];

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

const accumulatedExpensesData: any = [];
let accumulatedExpenses = 0;

Object.entries(expenses).forEach(([month, expenseThisMonth]) => {
  accumulatedExpenses += expenseThisMonth;
  accumulatedExpensesData.push({
    x: dayjs(month).toDate(),
    y: accumulatedExpenses,
  });
});

const fundingSources = [
  {
    id: 'MEAE',
    label: 'MEAE',
    value: 369383,
  },
  {
    id: 'France Relance',
    label: 'France Relance',
    value: 136356,
  },
  {
    id: 'Reset',
    label: 'Reset',
    value: 32187,
  },
  {
    id: 'DINUM',
    label: 'DINUM',
    value: 18690,
  },
];

const totalFundingSources = fundingSources
  .map(({ value }) => {
    return value;
  })
  .reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
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
              AccumulatedExpensesGraph: () => (
                <ResponsiveLine
                  colors={graphLineColors}
                  theme={graphLineTheme}
                  curve="monotoneX"
                  margin={{ top: 44, right: 4, bottom: 80, left: 84 }}
                  data={[
                    {
                      id: 'cost per month',
                      data: accumulatedExpensesData,
                    },
                  ]}
                  xScale={{
                    type: 'time',
                  }}
                  xFormat={(datum) => dayjs(datum).format('MMMM YYYY')}
                  yFormat={(datum) => datum.toLocaleString()}
                  axisLeft={{
                    format: (value) => value.toLocaleString(router.locale),
                    legend: <>{t('budget:accumulatedGraph.axis.left.legend')}</>,
                    legendOffset: -78,
                    legendPosition: 'middle',
                    tickSize: 0,
                    tickPadding: 8,
                    tickRotation: 0,
                  }}
                  axisBottom={{
                    format: (value) => dayjs(value).format('MMMM YYYY'),
                    tickRotation: -45,
                    tickPadding: 8,
                    tickSize: 8,
                    tickValues: 'every month',
                  }}
                  axisTop={null}
                  axisRight={null}
                  pointSize={8}
                  useMesh={true}
                  enableArea={true}
                  tooltip={(point) => {
                    return (
                      <div className={classNames('text__light', 'text__center', 'text__smallcaps')}>
                        {point.point.data.xFormatted}
                        <br />
                        {point.point.data.yFormatted}€
                      </div>
                    );
                  }}
                />
              ),
              FundingSourcesGraph: () => (
                <ResponsivePie
                  data={fundingSources}
                  colors={graphPieColors}
                  margin={{ top: 44, right: 44, bottom: 44, left: 44 }}
                  arcLinkLabelsThickness={2}
                  arcLabel={function (e) {
                    return Math.round((100 * e.value) / totalFundingSources).toString() + '%';
                  }}
                  arcLabelsTextColor="var(--colorBlack800)"
                />
              ),
              accumulatedExpenses: () => accumulatedExpenses.toLocaleString(router.locale),
              months: () => (Object.entries(expenses).length - 1).toString(),
            }}
          />
        </TextContent>
      </Container>
    </Layout>
  );
}
export const getStaticProps = withI18n({ load: 'mdx', filename: 'budget' })();
