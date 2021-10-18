import {
  ContributorActivity,
  ContributorActivityWeek,
  getAllVersionsContributorCommitActivity,
} from 'modules/Github/api';

import Column from 'modules/Common/components/Column';
import Container from 'modules/Common/containers/Container';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import LineChart from 'modules/Common/components/Charts/LineChart';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import { getGraphServices } from 'modules/OTA-api/api';
import { useTranslation } from 'next-i18next';
import { withI18n } from 'modules/I18n';

const DashboardPage = React.memo(({ graphServices, versionsContributorCommitActivity }: any) => {
  const { t } = useTranslation('common');

  const cuttOffDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
  const firstDayOfCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  //Total number of versions commits
  // const totalVersionsCommits = versionsContributorCommitActivity
  //   .map((contributorActivity: ContributorActivity) => {
  //     return contributorActivity.total;
  //   })
  //   .reduce((pv: number, cv: number) => {
  //     return pv + cv;
  //   });

  //Format commits versions data
  const tempVersionsCommitsData = versionsContributorCommitActivity
    .map((contributorActivity: ContributorActivity) => {
      return contributorActivity.weeks;
    })
    .flat()
    .sort((a: ContributorActivityWeek, b: ContributorActivityWeek) => (a.w > b.w ? 1 : -1))
    .reduce((acc: any, week: ContributorActivityWeek) => {
      if (week.c > 0) {
        const currentDate = new Date(week.w * 1000);
        if (
          currentDate.getTime() >= cuttOffDate.getTime() &&
          currentDate.getTime() < firstDayOfCurrentMonth.getTime()
        ) {
          const fullYear = currentDate.getFullYear();
          const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
          const formatedDate = `${fullYear}-${month}`;
          const chartData = {
            x: formatedDate,
            y: week.c,
          };

          if (acc[formatedDate] === undefined) {
            acc[formatedDate] = chartData;
          } else if (acc[formatedDate].x === formatedDate) {
            acc[formatedDate].y += week.c;
          }
        }
      }
      return acc;
    }, {});
  const versionsCommitsData = Object.keys(tempVersionsCommitsData).map(
    (key) => tempVersionsCommitsData[key]
  );

  //Format data for line graph services
  const trackedServicesData: any[] = [];
  const activeServicesData: any[] = [];
  if (graphServices) {
    graphServices.forEach((graphService: any) => {
      const graphServiceDate = new Date(
        new Date(graphService.year_month).getFullYear(),
        new Date(graphService.year_month).getMonth() + 1,
        0
      );

      if (
        graphServiceDate.getTime() >= cuttOffDate.getTime() &&
        graphServiceDate.getTime() < firstDayOfCurrentMonth.getTime()
      ) {
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

  const documentsVersionsLegend: string = t(
    'common:dashboard.activity.chart.legend.documentsversions',
    'Documents versions'
  );

  const trackedServicesLegend: string = t(
    'common:dashboard.activity.chart.legend.trackedservices',
    'Tracked services'
  );
  const activeServicesLegend: string = t(
    'common:dashboard.activity.chart.legend.activeservices',
    'Active services'
  );
  const servicesAxisBottomLegend: string = t(
    'common:dashboard.activity.chart.axis.bottom.legend',
    'year-month'
  );
  const servicesAxisLeftLegend: string = t(
    'common:dashboard.activity.chart.axis.left.legend',
    'number'
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
          title={t('common:dashboard.activity.title', 'Activity')}
          subtitle={t('common:dashboard.activity.subtitle', `Last 12 months activity`)}
        >
          <TextContent>
            <p>
              {t(
                'common:dashboard.activity.desc',
                `Evolution of services and documents versions over the last 12 months`
              )}
            </p>
          </TextContent>
          <LineChart
            height={580}
            data={[
              {
                id: documentsVersionsLegend,
                data: versionsCommitsData,
              },
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
              legend: servicesAxisBottomLegend,
              legendOffset: 44,
              legendPosition: 'middle',
            }}
            axisLeft={{
              tickSize: 8,
              tickPadding: 8,
              tickRotation: 0,
              legend: servicesAxisLeftLegend,
              legendOffset: -48,
              legendPosition: 'middle',
            }}
          />
        </Column>
      </Container>
    </Layout>
  );
});

export const getStaticProps = withI18n()(async (props: any) => {
  const graphServices = await getGraphServices();
  const versionsContributorCommitActivity = await getAllVersionsContributorCommitActivity();
  return JSON.parse(
    JSON.stringify({
      props: { ...props, graphServices, versionsContributorCommitActivity },
      revalidate: 60 * 60 * 1,
    })
  );
});

export default DashboardPage;
