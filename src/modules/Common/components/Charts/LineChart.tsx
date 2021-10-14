import { ResponsiveLine, Serie } from '@nivo/line';

import { AxisProps } from '@nivo/axes';
import { Box } from '@nivo/core';
import React from 'react';

type LineChartProps = {
  height?: number;
  data: Serie[];
  margin?: Box;
  axisTop?: AxisProps | null;
  axisRight?: AxisProps | null;
  axisBottom?: AxisProps | null;
  axisLeft?: AxisProps | null;
} & React.HTMLAttributes<HTMLDivElement>;

const LineChart: React.FC<LineChartProps> = ({
  children,
  className,
  height = 480,
  data,
  margin = { top: 44, right: 88, bottom: 96, left: 52 },
  axisTop = null,
  axisBottom = null,
  axisLeft = null,
  axisRight = null,
  ...props
}) => {
  return (
    <div style={{ height: height }} {...props}>
      <ResponsiveLine
        colors={['#0496ff', '#0b08a0', '#11ebc3']}
        theme={{
          textColor: '#5e5e5e',
          fontSize: 12,
          axis: {
            domain: {
              line: {
                stroke: '#999999',
                strokeWidth: 1,
              },
            },
            ticks: {
              line: {
                stroke: '#999999',
                strokeWidth: 1,
              },
            },
          },
          grid: {
            line: {
              stroke: '#dddddd',
              strokeWidth: 1,
            },
          },
        }}
        data={data}
        margin={margin}
        curve="linear"
        enableGridX={false}
        axisTop={axisTop}
        axisBottom={axisBottom}
        axisRight={axisRight}
        axisLeft={axisLeft}
        pointBorderWidth={2}
        pointSize={10}
        lineWidth={2}
        useMesh={true}
        enableSlices="x"
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 96,
            itemWidth: 144,
            itemHeight: 20,
            itemsSpacing: 4,
            symbolSize: 20,
            symbolShape: 'circle',
            itemDirection: 'left-to-right',
            itemTextColor: '#777',
          },
        ]}
      />
    </div>
  );
};

export default React.memo(LineChart);
