import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import useTranslation from 'next-translate/useTranslation';

type FundingSourcesGraphProps = {} & React.HTMLAttributes<HTMLDivElement>;

const graphPieColors = [
  'var(--colorPrimary)',
  'hsl(205,80%,65%)',
  'hsl(205,60%,70%)',
  'hsl(205,40%,75%)',
];

const FundingSourcesGraph: React.FC<FundingSourcesGraphProps> = () => {
  const { t } = useTranslation();
  const fundingSources = [
    {
      id: t('budget:funding-sources.meae'),
      value: 369383,
    },
    {
      id: t('budget:funding-sources.france-relance'),
      value: 136356,
    },
    {
      id: t('budget:funding-sources.reset'),
      value: 32187,
    },
    {
      id: t('budget:funding-sources.dinum'),
      value: 18690,
    },
  ];

  const totalFundingSources = fundingSources
    .map(({ value }) => value)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  return (
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
  );
};

export default FundingSourcesGraph;
