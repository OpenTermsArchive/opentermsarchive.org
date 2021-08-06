import { Trans, useTranslation } from 'react-i18next';

import Breadcrumb from 'components/BreadCrumb';
import Button from 'modules/Common/components/Button';
import Column from 'modules/Common/components/Column';
import Container from 'modules/Common/containers/Container';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import Link from 'next/link';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import useUrl from 'hooks/useUrl';

const ThanksPage = () => {
  const { t } = useTranslation();
  const {
    queryParams: { email, url },
  } = useUrl();
  return (
    <Layout
      title={t('contribute:thanks_page.seo.title', 'Thanks')}
      desc={t('contribute:thanks_page.seo.desc', 'Thanks for contributing')}
    >
      {/* Hero */}
      <Container layout="wide" paddingY={false} dark={true} bgColor="#010613">
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Hero title={t('contribute:thanks_page.title', 'Thanks')}></Hero>
        </Container>
      </Container>

      <Container paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Column width={100}>
            <Breadcrumb
              items={[
                { name: 'Open Terms Archive', url: 'https://www.opentermsarchive.org' },
                {
                  name: 'Contribute',
                  url: './../#' + t('common:home_page.contribute.id', 'contribute'),
                },
                { name: t('contribute:home_page.title'), url: '/contribute' },
                { name: t('contribute:thanks_page.title', 'Thanks') },
              ]}
            />
            <TextContent>
              <h2>{t('contribute:thanks_page.subtitle', 'Thanks for your contribution')}</h2>
              {email && (
                <p>
                  {t(
                    'contribute:thanks_page.explanation',
                    'You only need to send us the email (a popup should have opened) and we will let you know as soon as the service is integrated in the system.'
                  )}
                </p>
              )}
              {url && (
                <p>
                  <Trans i18nKey="contribute:thanks_page.github_url" url={url}>
                    We just created a GitHub issue for your demand. <br />
                    You can subscribe to notifications there: 
                    <a href={url} target="_blank">
                      {{ url }}
                    </a>
                    .<br />
                    <br />
                    You may also track the changes to the terms of service and privacy policies for
                    other online services by email.Please refer to the form you will find on our
                    homepage.
                  </Trans>
                </p>
              )}
              <Link href="/contribute">
                <Button>{t('contribute:thanks_page.cta')}</Button>
              </Link>
            </TextContent>
          </Column>
        </Container>
      </Container>
    </Layout>
  );
};

export default ThanksPage;
