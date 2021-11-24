import {
  Commit,
  Commits,
  ContributorActivity,
  ContributorActivityWeek,
  ContributorsActivity,
  getAllVersionsContributorCommitActivity,
  getLastVersionsCommits,
} from 'modules/Github/api';
import { GraphServices, Services, getGraphServices, getServices } from 'modules/OTA-api/api';

import Button from 'modules/Common/components/Button';
import ButtonBlock from 'modules/Common/components/ButtonBlock';
import Column from 'modules/Common/components/Column';
import Container from 'modules/Common/containers/Container';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import LineChart from 'modules/Common/components/Charts/LineChart';
import Link from 'next/link';
import LinkIcon from 'modules/Common/components/LinkIcon';
import React from 'react';
import ServicesList from 'modules/Common/components/ServicesList';
import TextContent from 'modules/Common/components/TextContent';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import useSWR from 'swr';
import { useTranslation } from 'next-i18next';
import { withI18n } from 'modules/I18n';

dayjs.extend(localizedFormat);

const DashboardPage = React.memo(
  ({
    graphServices: defaultGraphService,
    versionsContributorCommitActivity: defaultVersionsContributorCommitActivity,
    latestVersionsCommits: defaultLatestVersionsCommits,
    services: defaultServices,
  }: {
    graphServices: GraphServices;
    versionsContributorCommitActivity: ContributorsActivity;
    latestVersionsCommits: Commits;
    services: Services;
  }) => {
    const { t } = useTranslation(['common', 'dashboard']);

    const { data: services } = useSWR<Services>('/api/ota/services/all', {
      initialData: defaultServices,
      revalidateOnMount: true,
    });

    const { data: versionsContributorCommitActivity } = useSWR<ContributorsActivity>(
      '/api/ota/stats/contributors',
      {
        initialData: defaultVersionsContributorCommitActivity,
        revalidateOnMount: true,
      }
    );

    const { data: graphServices } = useSWR<GraphServices>('/api/ota/services/graph', {
      initialData: defaultGraphService,
      revalidateOnMount: true,
    });

    const { data: latestVersionsCommits } = useSWR<Commits>('/api/ota/versions/commits/latest', {
      initialData: defaultLatestVersionsCommits,
      revalidateOnMount: true,
    });

    const nbServices = Object.keys(services || {}).length;
    const cuttOffDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    const firstDayOfCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

    //Total number of versions commits
    const totalVersionsCommits = (versionsContributorCommitActivity || [])
      .map((contributorActivity: ContributorActivity) => {
        return contributorActivity.total;
      })
      .reduce((pv: number, cv: number) => {
        return pv + cv;
      });

    //Format commits versions data
    const tempVersionsCommitsData = (versionsContributorCommitActivity || [])
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

    const documentsVersionsLegend: string = t('activity.chart.legend.documentsversions', {
      ns: 'dashboard',
    });

    const trackedServicesLegend: string = t('activity.chart.legend.trackedservices', {
      ns: 'dashboard',
    });
    const activeServicesLegend: string = t('activity.chart.legend.activeservices', {
      ns: 'dashboard',
    });
    const servicesAxisBottomLegend: string = t('activity.chart.axis.bottom.legend', {
      ns: 'dashboard',
    });
    const servicesAxisLeftLegend: string = t('activity.chart.axis.left.legend', {
      ns: 'dashboard',
    });

    return (
      <Layout title={t('seo.title', { ns: 'dashboard' })} desc={t('seo.desc', { ns: 'dashboard' })}>
        <Container layout="wide" paddingY={false} gray={true}>
          <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
            <Hero
              title={t('hero.title', { ns: 'dashboard' })}
              subtitle={t('hero.subtitle', { ns: 'dashboard' })}
            ></Hero>
          </Container>
        </Container>

        <Container gridCols="12" gridGutters="11">
          <Column
            width={100}
            title={t('activity.title', { ns: 'dashboard' })}
            subtitle={t('activity.subtitle', { ns: 'dashboard' })}
          >
            <TextContent>
              <p>{t('activity.desc', { ns: 'dashboard' })}</p>
            </TextContent>
            {versionsCommitsData && trackedServicesData && activeServicesData && (
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
            )}
          </Column>
        </Container>

        <Container gridCols="12" gridGutters="11" flex={true}>
          <Column
            width={60}
            title={t('latestversionscommits.title', { ns: 'dashboard' })}
            subtitle={t('latestversionscommits.subtitle', { ns: 'dashboard' })}
          >
            <TextContent>
              <ul>
                {(latestVersionsCommits || []).map((versionCommit: Commit) => {
                  return (
                    <li key={`latest_versions_commits_${versionCommit.sha}`}>
                      <LinkIcon target="_blank" href={versionCommit.html_url}>
                        {versionCommit.commit.message.split('\n\n')[0]}
                      </LinkIcon>
                      {' - '}
                      <span className="text__light">
                        ({dayjs(versionCommit.commit.author.date).format('llll')})
                      </span>
                    </li>
                  );
                })}
              </ul>
            </TextContent>
          </Column>
          <Column width={40} alignX="center" alignY="center">
            <ButtonBlock
              title={t('latestversionscommits.buttonblock.title', {
                ns: 'dashboard',
                count: totalVersionsCommits,
              })}
              desc={t('latestversionscommits.buttonblock.desc', { ns: 'dashboard' })}
              fillParent={true}
            >
              <Link href="https://github.com/ambanum/OpenTermsArchive-versions/">
                <a title={t('latestversionscommits.buttonblock.link.title', { ns: 'dashboard' })}>
                  <Button>
                    {t('latestversionscommits.buttonblock.label', { ns: 'dashboard' })}
                  </Button>
                </a>
              </Link>
            </ButtonBlock>
          </Column>
        </Container>
        <ServicesList
          services={services || {}}
          title={t('serviceslist.title', { ns: 'dashboard' })}
          subtitle={t('serviceslist.subtitle', {
            count: nbServices,
            ns: 'dashboard',
          })}
        />
      </Layout>
    );
  }
);

export const getStaticProps = withI18n()(async (props: any) => {
  const services = await getServices();
  const graphServices = await getGraphServices();
  const versionsContributorCommitActivity = await getAllVersionsContributorCommitActivity();
  const latestVersionsCommits = await getLastVersionsCommits();
  return JSON.parse(
    JSON.stringify({
      props: {
        ...props,
        graphServices,
        versionsContributorCommitActivity,
        latestVersionsCommits,
        services,
      },
      revalidate: 60 * 60 * 1,
    })
  );
});

export default DashboardPage;
