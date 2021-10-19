import {
  Commit,
  ContributorActivity,
  ContributorActivityWeek,
  getAllVersionsContributorCommitActivity,
  getLastVersionsCommits,
} from 'modules/Github/api';
import { getGraphServices, getServices } from 'modules/OTA-api/api';

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
import TextContent from 'modules/Common/components/TextContent';
import { useTranslation } from 'next-i18next';
import { withI18n } from 'modules/I18n';

const DashboardPage = React.memo(
  ({
    graphServices = [],
    versionsContributorCommitActivity = [],
    latestVersionsCommits = [],
    services = [],
  }: any) => {
    const { t } = useTranslation('common');

    const nbServices = Object.keys(services).length;

    services = Object.entries(services).sort();

    const cuttOffDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    const firstDayOfCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

    //Total number of versions commits
    const totalVersionsCommits = versionsContributorCommitActivity
      .map((contributorActivity: ContributorActivity) => {
        return contributorActivity.total;
      })
      .reduce((pv: number, cv: number) => {
        return pv + cv;
      });

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
            title={t('common:dashboard.latestversionscommits.title', 'Latest changes recorded')}
            subtitle={t(
              'common:dashboard.latestversionscommits.subtitle',
              'on the tracked documents'
            )}
          >
            <TextContent>
              <ul>
                {latestVersionsCommits.map((versionCommit: Commit) => {
                  const splittedMessage = versionCommit.commit.message.split('\n\n');
                  const date = new Date(versionCommit.commit.author.date);
                  return (
                    <li>
                      <LinkIcon target="_blank" href={versionCommit.html_url}>
                        {splittedMessage[0]}
                      </LinkIcon>
                      {' - '}
                      <span className="text__light">({date.toUTCString()})</span>
                    </li>
                  );
                })}
              </ul>
            </TextContent>
          </Column>
          <Column width={40} alignX="center" alignY="center">
            <ButtonBlock
              title={t(
                'common:dashboard.latestversionscommits.buttonbloc.title',
                'We recorded {{count}} documents versions',
                { count: totalVersionsCommits }
              )}
              desc={t(
                'common:dashboard.latestversionscommits.buttonbloc.desc',
                'And it continues every day, explore them on GitHub.'
              )}
              fillParent={true}
            >
              <Link href="https://github.com/ambanum/OpenTermsArchive-versions/">
                <a
                  title={t(
                    'common:dashboard.latestversionscommits.buttonbloc.link.title',
                    'Explore the documents versions'
                  )}
                >
                  <Button>
                    {t('common:dashboard.latestversionscommits.buttonbloc.label', 'Explore now')}
                  </Button>
                </a>
              </Link>
            </ButtonBlock>
          </Column>
        </Container>
        <Container gridCols="12" gridGutters="11">
          <Column
            width={100}
            title={t('common:dashboard.serviceslist.title', 'Services list')}
            subtitle={t('common:dashboard.serviceslist.subtitle', '{{count}} services', {
              count: nbServices,
            })}
          >
            <TextContent>
              <ul>
                {services.map((service: any) => {
                  return (
                    <li>
                      {service[0]}
                      {' - '}

                      {service[1].map((documentType: string, index: number, array: any) => {
                        const separator = index < array.length - 1 ? '; ' : '';
                        const target = `https://github.com/ambanum/OpenTermsArchive-versions/blob/master/${service}/${documentType}.md`;
                        return (
                          <>
                            <Link href={target}>
                              <a className="a__small" target="_blank" rel="noopener">
                                {documentType}
                                {separator}
                              </a>
                            </Link>
                          </>
                        );
                      })}
                    </li>
                  );
                })}
              </ul>
            </TextContent>
          </Column>
        </Container>
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
