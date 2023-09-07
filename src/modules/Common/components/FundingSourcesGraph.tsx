import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { useTranslation } from 'modules/I18n';

type FundingSourcesGraphProps = {} & React.HTMLAttributes<HTMLDivElement>;

const graphPieColors = [
  'var(--colorPrimary)',
  'hsl(205,90%,80%)',
  'hsl(205,90%,70%)',
  'hsl(205,80%,60%)',
  'hsl(205,80%,50%)',
  'hsl(205,80%,40%)',
  'hsl(205,60%,30%)',
  'hsl(205,40%,25%)',
  'hsl(205,40%,20%)',
  'hsl(205,40%,10%)',
];

const FundingSourcesGraph: React.FC<FundingSourcesGraphProps> = () => {
  const { t } = useTranslation();
  const fundingSources = [
    {
      id: t('budget:funding-sources.meae'),
      value: 595931,
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
      value: 18811,
    },
    {
      id: t('budget:funding-sources.ubremen'),
      value: 17447,
    },
    {
      id: t('budget:funding-sources.comeu'),
      value: 12000,
    },
    {
      id: t('budget:funding-sources.nlnet'),
      value: 7465,
    },
    {
      id: t('budget:funding-sources.ufc'),
      value: 2085,
    },
    {
      id: t('budget:funding-sources.dpga'),
      value: 1250,
    },
  ];

  const totalFundingSources = fundingSources
    .map(({ value }) => value)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  return (
    <ResponsivePie
      data={fundingSources}
      colors={graphPieColors}
      margin={{ top: 44, right: 44, bottom: 240, left: 44 }}
      innerRadius={0.6}
      enableArcLabels={false}
      padAngle={2}
      arcLinkLabel={function (e) {
        return Math.round((100 * e.value) / totalFundingSources).toString() + '%';
      }}
      arcLinkLabelsTextColor="var(--colorBlack600)"
      arcLinkLabelsStraightLength={30}
      arcLinkLabelsTextOffset={4}
      arcLinkLabelsDiagonalLength={30}
      theme={{ legends: { text: { fontSize: 16 } } }}
      legends={[
        {
          anchor: 'bottom',
          direction: 'column',
          justify: false,
          translateX: 0,
          translateY: 240,
          itemsSpacing: 0,
          itemWidth: 240,
          itemHeight: 24,
          itemTextColor: 'var(--colorBlack800)',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
        },
      ]}
    />
  );
};

export default FundingSourcesGraph;
