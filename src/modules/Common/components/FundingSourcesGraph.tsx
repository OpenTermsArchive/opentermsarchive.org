import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { useTranslation } from 'modules/I18n';

type FundingSourcesGraphProps = {} & React.HTMLAttributes<HTMLDivElement>;

const graphPieColors = [
  'var(--colorPrimary)',
  'hsl(205,80%,40%)',
  'hsl(205,60%,50%)',
  'hsl(205,40%,60%)',
  'hsl(205,40%,70%)',
  'hsl(205,40%,80%)',
];

const FundingSourcesGraph: React.FC<FundingSourcesGraphProps> = () => {
  const { t } = useTranslation();
  const fundingSources = [
    {
      id: t('budget:funding-sources.meae'),
      value: 476988,
    },
    {
      id: t('budget:funding-sources.france-relance'),
      value: 145695,
    },
    {
      id: t('budget:funding-sources.reset'),
      value: 32187,
    },
    {
      id: t('budget:funding-sources.dinum'),
      value: 18750,
    },
    {
      id: t('budget:funding-sources.comeu'),
      value: 12000,
    },
    {
      id: t('budget:funding-sources.ubremen'),
      value: 11537,
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
