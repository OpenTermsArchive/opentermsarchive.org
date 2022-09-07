import React from 'react';
import { useRouter } from 'next/router';
import { ResponsivePie } from '@nivo/pie';

type FundingSourcesGraphProps = {} & React.HTMLAttributes<HTMLDivElement>;

const graphPieColors = [
  'var(--colorPrimary)',
  'hsl(205,80%,65%)',
  'hsl(205,60%,70%)',
  'hsl(205,40%,75%)',
];

const FundingSourcesGraph: React.FC<FundingSourcesGraphProps> = () => {
  const router = useRouter();
  const fundingSources = [
    {
      id:
        router?.locale === 'fr'
          ? '🇫🇷🏛 Ministère de l’Europe et des Affaires Étrangères'
          : '🇫🇷🏛 French Ministry for Europe and Foreign Affairs ',
      value: 369383,
    },
    {
      id: router?.locale === 'fr' ? '🇪🇺🏛 France Relance' : '🇪🇺🏛 French Covid Recovery Fund',
      value: 136356,
    },
    {
      id: '🇺🇸🏦 Reset',
      value: 32187,
    },
    {
      id:
        router?.locale === 'fr'
          ? '🇫🇷🏛 Direction Interministérielle du Numérique'
          : '🇫🇷🏛 Interministerial Directorate for Digital Affairs',
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
