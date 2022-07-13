import { Trans, useTranslation } from 'next-i18next';

import Button from 'modules/Common/components/Button';
import ButtonBlock from 'modules/Common/components/ButtonBlock';
import ButtonBlockList from 'modules/Common/components/ButtonBlockList';
import Card from 'modules/Common/components/Card';
import CardList from 'modules/Common/components/CardList';
import Column from 'modules/Common/components/Column';
import Container from 'modules/Common/containers/Container';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import Link from 'next/link';
import LinkIcon from 'modules/Common/components/LinkIcon';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import instancesData from '../../public/instances.json';
import { kebabCase } from 'lodash';
import { uniqueId } from 'lodash';
import { useRouter } from 'next/router';
import { withI18n } from 'modules/I18n';

const HomePage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const languageName = new Intl.DisplayNames(router.locale, { type: 'language' });
  const countryName = new Intl.DisplayNames(router.locale, { type: 'region' });

  return (
    <Layout title={t('homepage:seo.title')} desc={t('homepage:seo.desc')}>
      {/* Mission statement + What is it ? */}
      <Container layout="wide" dark={true} paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Hero title={t('homepage:mission_statement')} subtitle={t('homepage:what_it_is')}></Hero>
        </Container>
      </Container>
      {/* How it works -  1 step */}
      <Container layout="wide" paddingY={false}>
        <Container gridCols="11" gridGutters="10" paddingX={false}>
          <h2 className="text__center">{t('homepage:how.title')}</h2>
        </Container>
        <Container gridCols="11" gridGutters="10" flex={true} paddingX={false}>
          <Column width={50}>
            <h3>{t('homepage:how.bloc1.title')}</h3>
            <p className="mt__M h3 h3__light">{t('homepage:how.bloc1.desc')}</p>
          </Column>
          <Column width={50} alignX="right">
            <div style={{ maxWidth: '480px' }}>
              <img src="/images/how-it-works/step-1.png" />
            </div>
          </Column>
        </Container>
      </Container>
      {/* How it works -  2 step */}
      <Container layout="wide" paddingY={false}>
        <Container gridCols="11" gridGutters="10" flex={true} paddingX={false}>
          <Column width={50}>
            <h3>{t('homepage:how.bloc2.title')}</h3>
            <p className="mt__M h3 h3__light">{t('homepage:how.bloc2.desc')}</p>
          </Column>
          <Column width={50} alignX="right">
            <div style={{ maxWidth: '480px' }}>
              <img src="/images/how-it-works/step-2.png" />
            </div>
          </Column>
        </Container>
      </Container>
      {/* How it works -  3 step */}
      <Container layout="wide" paddingY={false}>
        <Container gridCols="11" gridGutters="10" flex={true} paddingX={false}>
          <Column width={50}>
            <h3>{t('homepage:how.bloc3.title')}</h3>
            <p className="mt__M h3 h3__light">{t('homepage:how.bloc3.desc')}</p>
          </Column>
          <Column width={50} alignX="right">
            <div style={{ maxWidth: '430px' }}>
              <img src="/images/how-it-works/step-3.png" />
            </div>
          </Column>
        </Container>
      </Container>
      {/* How it works -  4 step */}
      <Container layout="wide" paddingTop={false}>
        <Container gridCols="11" gridGutters="10" flex={true} paddingX={false}>
          <Column width={50}>
            <h3>{t('homepage:how.bloc4.title')}</h3>
            <p className="mt__M h3 h3__light">{t('homepage:how.bloc4.desc')}</p>
            <p className="mt__L">
              <Link href="https://github.com/ambanum/OpenTermsArchive-versions/releases">
                <a target="_blank" rel="noopener">
                  <Button type="secondary">{t('homepage:how.bloc4.cta.label')}</Button>
                </a>
              </Link>
            </p>
          </Column>
          <Column width={50} alignX="right" alignY="center">
            <div style={{ maxWidth: '350px' }}>
              <img src="/images/how-it-works/step-4.png" />
            </div>
          </Column>
        </Container>
      </Container>
      {/* Instances */}
      <Container gridCols="10" gridGutters="9" paddingTop={false}>
        <CardList title={t('instances:title')} centerTitle={true} big={true}>
          {instancesData.instances.map((instance: any) => {
            const slug = kebabCase(instance.name);
            return (
              <Card
                key={uniqueId('instance_')}
                title={instance.name}
                subtitle={t(`instances:${slug}.desc`)}
                author={
                  instance.maintainers.length == 0
                    ? t('instances:volunteer-contributors')
                    : instance.maintainers.map((maintener: any) => {
                        return (
                          <img
                            key={uniqueId('maintener_')}
                            src={maintener.logo}
                            alt={maintener.name}
                          />
                        );
                      })
                }
                image={instance.image}
                className="text__center"
                center={true}
                big={true}
                authorCenter={true}
                authorIcon={instance.name === 'Contrib' ? true : false}
              >
                <div>
                  {t('instances:services')} {instance.stats.services}
                </div>
                <div>
                  {t('instances:documents')} {instance.stats.documents}
                </div>
                <div>
                  {t('instances:language', { count: instance.languages.length })}{' '}
                  {instance.languages.length > 0
                    ? instance.languages.map((language: any, index: number) => {
                        let displayLang = languageName.of(language);
                        displayLang += index == instance.languages.length - 1 ? '' : ', ';
                        return displayLang;
                      })
                    : null}
                </div>
                <div>
                  {t('instances:country', { count: instance.countries.length })}{' '}
                  {instance.countries.length > 0
                    ? instance.countries.map((country: any, index: number) => {
                        let displayCountry = countryName.of(country);
                        displayCountry += index == instance.countries.length - 1 ? '' : ', ';
                        return displayCountry;
                      })
                    : null}
                </div>
                <div className="mt__XL">
                  <Link href={`https://github.com/openTermsArchive/${slug}-versions`}>
                    <a target="_blank" rel="noopener">
                      <Button>{t('instances:cta.versions')}</Button>
                    </a>
                  </Link>
                </div>
                {instance.subscribeURL && (
                  <div className="mt__M">
                    <Link href="/subscribe">
                      <Button type="secondary">{t('instances:cta.email')}</Button>
                    </Link>
                  </div>
                )}
              </Card>
            );
          })}
        </CardList>
      </Container>

      {/* Folllow us */}
      <Container gray={true} layout="wide">
        <Container gridCols="12" gridGutters="11" paddingY={false}>
          <TextContent className="text__center">
            <h2>{t('homepage:followUs.title')}</h2>
            <h3 className="h3__light">{t('homepage:followUs.subtitle')}</h3>
            <div className="mt__2XL">
              <Link href="https://twitter.com/OpenTerms">
                <a target="_blank" rel="noopener">
                  <Button type="secondary">{t('homepage:followUs.button.label')}</Button>
                </a>
              </Link>
            </div>
          </TextContent>
        </Container>
      </Container>

      {/* Reuses */}
      <Container gridCols="12" gridGutters="11">
        <CardList title={t('homepage:reuses.title')} subtitle={t('homepage:reuses.subtitle')}>
          <Card
            image={`/images/reuses/memos-elections-${router?.locale}.png`}
            className="text__center"
            title={t('homepage:reuses.memos-elections-fr.title')}
            subtitle={t('homepage:reuses.memos-elections-fr.subtitle')}
            author={t('homepage:reuses.memos-elections-fr.author')}
            link="https://www.reset.tech/resources/memos-on-platforms-behaviour-during-the-2022-french-elections/"
            center={true}
          ></Card>
          <Card
            image="/images/reuses/tosdr.jpg"
            title={t('homepage:reuses.tosdr.title')}
            subtitle={t('homepage:reuses.tosdr.subtitle')}
            author={t('homepage:reuses.tosdr.author')}
            link="https://tosdr.org"
            center={true}
          ></Card>
          <Card
            image="/images/reuses/readability.jpg"
            title={t('homepage:reuses.readability.title')}
            subtitle={t('homepage:reuses.readability.subtitle')}
            author={t('homepage:reuses.readability.author')}
            link="https://disinfo.quaidorsay.fr/en/open-terms-archive/experiments"
            center={true}
          ></Card>
          <Card
            image="/images/reuses/scripta-manent.jpg"
            title={t('homepage:reuses.scripta_manent.title')}
            subtitle={t('homepage:reuses.scripta_manent.subtitle')}
            author={t('homepage:reuses.scripta_manent.author')}
            link="https://disinfo.quaidorsay.fr/fr/open-terms-archive/scripta-manent"
            center={true}
          ></Card>
          <Card
            image="/images/reuses/tosback.jpg"
            title={t('homepage:reuses.tosback.title')}
            subtitle={t('homepage:reuses.tosback.subtitle')}
            author={t('homepage:reuses.tosback.author')}
            link="https://tosback.org/"
            center={true}
          ></Card>
          <Card
            image="/images/reuses/new-reuse.jpg"
            className="text__center"
            title={t('homepage:reuses.new_reuse.title')}
            subtitle={t('homepage:reuses.new_reuse.subtitle')}
            link="mailto:contact@opentermsarchive.org"
            center={true}
          ></Card>
        </CardList>
      </Container>

      {/* FOSS & Contributors */}
      <Container gray={true} layout="wide">
        <Container gridCols="12" gridGutters="11" paddingY={false}>
          <TextContent className="">
            <h2>{t('homepage:foss.title')}</h2>
            <h3 className="h3__light">{t('homepage:foss.subtitle')}</h3>
            <Link href="/about">
              <Button type="secondary">{t('homepage:foss.button.label')}</Button>
            </Link>
          </TextContent>
        </Container>
      </Container>
    </Layout>
  );
};

export const getStaticProps = withI18n()(async (props: any) => {
  return JSON.parse(JSON.stringify({ props: { ...props }, revalidate: 10 }));
});

export default HomePage;
