import React from 'react';
import classNames from 'classnames';
import { ResponsiveLine } from '@nivo/line';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { useTranslation } from 'modules/I18n';

type TotalExpendituresGraphProps = {
  data: React.ComponentProps<typeof ResponsiveLine>['data'];
} & React.HTMLAttributes<HTMLDivElement>;

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

const graphLineColors = ['var(--colorPrimary)'];

const TotalExpendituresGraph: React.FC<TotalExpendituresGraphProps> = ({ data }) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <ResponsiveLine
      colors={graphLineColors}
      theme={graphLineTheme}
      curve="monotoneX"
      margin={{ top: 44, right: 4, bottom: 80, left: 84 }}
      data={data}
      xScale={{
        format: '%Y-%m-%dT%H:%M:%S.%L%Z',
        type: 'time',
      }}
      xFormat={(datum) => dayjs(datum).format('MMMM YYYY')}
      yFormat={(datum) => datum.toLocaleString()}
      axisLeft={{
        format: (value) => value.toLocaleString(router.locale),
        legend: <>{t('budget:totalExpendituresGraph.axis.left.legend')}</>,
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
  );
};

export default TotalExpendituresGraph;
