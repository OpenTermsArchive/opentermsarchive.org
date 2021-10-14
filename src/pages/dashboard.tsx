import Column from 'modules/Common/components/Column';
import Container from 'modules/Common/containers/Container';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import LineChart from 'modules/Common/components/Charts/LineChart';
import React from 'react';
import { getGraphServices } from 'modules/OTA-api/api';
import { useTranslation } from 'next-i18next';
import { withI18n } from 'modules/I18n';

const DashboardPage = ({ graphServices }: any) => {
  const { t } = useTranslation('common');

  //Format data for line graph services
  const trackedServicesData: any[] = [];
  const activeServicesData: any[] = [];
  const minDate = new Date('2020-06');
  const date = new Date();
  const firstDayOfCurrentMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  if (graphServices) {
    graphServices.forEach((graphService: any) => {
      let graphServiceDate = new Date(graphService.year_month);

      //Before 2020-06 data are not relevant
      //Do not display current month data
      if (graphServiceDate > minDate && graphServiceDate < firstDayOfCurrentMonth) {
        trackedServicesData.push({
          x: graphService.year_month,
          y: graphService.n_services_tracked,
        });
        activeServicesData.push({
          x: graphService.year_month,
          y: graphService.n_services_active,
        });
      }
    });
  }

  const trackedServicesLegend: string = t(
    'common:dashboard.services.chart.legend.trackedservices',
    'Tracked services'
  );
  const activeServicesLegend: string = t(
    'common:dashboard.services.chart.legend.activeservices',
    'Active services'
  );
  const axisBottomLegend: string = t(
    'common:dashboard.services.chart.axis.bottom.legend',
    'year-month'
  );
  const axisLeftLegend: string = t(
    'common:dashboard.services.chart.axis.left.legend',
    'number of services'
  );

  return (
    <Layout title={t('common:dashboard.seo.title', 'Dashboard')}>
      <Container layout="wide" paddingY={false} gray={true}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Hero
            title={t('common:dashboard.hero.title', 'Dashboard')}
            subtitle={t(
              'common:dashboard.hero.subtitle',
              'A set of activity metrics for Open Terms Archive'
            )}
          ></Hero>
        </Container>
      </Container>
      <Container gridCols="12" gridGutters="11">
        <Column
          width={100}
          title={t('common:dashboard.services.title', 'Services')}
          subtitle={t(
            'common:dashboard.services.subtitle',
            'Evolution of tracked and active services'
          )}
        >
          <LineChart
            height={480}
            data={[
              {
                id: trackedServicesLegend,
                data: trackedServicesData,
              },
              {
                id: activeServicesLegend,
                data: activeServicesData,
              },
            ]}
            axisBottom={{
              tickSize: 8,
              tickPadding: 8,
              tickRotation: 0,
              legend: axisBottomLegend,
              legendOffset: 44,
              legendPosition: 'middle',
            }}
            axisLeft={{
              tickSize: 8,
              tickPadding: 8,
              tickRotation: 0,
              legend: axisLeftLegend,
              legendOffset: -48,
              legendPosition: 'middle',
            }}
          />
        </Column>
      </Container>
    </Layout>
  );
};

export const getStaticProps = withI18n()(async (props: any) => {
  const graphServices = await getGraphServices();
  return JSON.parse(JSON.stringify({ props: { ...props, graphServices }, revalidate: 10 }));
});

export default DashboardPage;
