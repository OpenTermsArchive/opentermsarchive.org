import { FiMail as IconMail, FiTwitter as IconTwitter } from 'react-icons/fi';

import Button from 'modules/Common/components/Button';
import Card from 'modules/Common/components/Card';
import CardList from 'modules/Common/components/CardList';
import Column from 'modules/Common/components/Column';
import Container from 'modules/Common/containers/Container';
import Hero from 'modules/Common/components/Hero';
import Instances from 'modules/Common/components/Instances';
import Layout from 'modules/Common/containers/Layout';
import Link from 'next/link';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { withI18n } from 'modules/I18n';

const HomePage = () => {
  const { t } = useTranslation();
  const router = useRouter();
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
          </Column>
          <Column width={50} alignX="right" alignY="center">
            <div style={{ maxWidth: '350px' }}>
              <img src="/images/how-it-works/step-4.png" />
            </div>
          </Column>
        </Container>
      </Container>

      {/* Instances */}
      <Container gray={true} layout="wide" paddingX={false}>
        <Container gridCols="10" gridGutters="9" paddingTop={false}>
          <Instances />
        </Container>
      </Container>

      {/* Follow us */}
      <Container layout="wide" paddingY={false} dark={true}>
        <Container gridCols="9" gridGutters="8" flex={true}>
          <Column width={40} alignX="center" alignY="center">
            <IconTwitter size="128" color="var(--colorBlack400)" strokeWidth="1px" />
          </Column>
          <Column width={60} subtitle={t('follow-us:title')}>
            <TextContent marginTop={false}>
              <p className="mt__M">{t('follow-us:desc')}</p>
              <Link href="https://twitter.com/OpenTerms">
                <a target="_blank" rel="noopener">
                  <Button className="mb__0">{t('follow-us:button.label')}</Button>
                </a>
              </Link>
            </TextContent>
          </Column>
        </Container>
      </Container>

      {/* Reuses */}
      <Container gray={true} layout="wide" paddingX={false}>
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
              white={true}
            />
            <Card
              image="/images/reuses/tosdr.jpg"
              title={t('homepage:reuses.tosdr.title')}
              subtitle={t('homepage:reuses.tosdr.subtitle')}
              author={t('homepage:reuses.tosdr.author')}
              link="https://tosdr.org"
              center={true}
              white={true}
            />
            <Card
              image="/images/reuses/readability.jpg"
              title={t('homepage:reuses.readability.title')}
              subtitle={t('homepage:reuses.readability.subtitle')}
              author={t('homepage:reuses.readability.author')}
              link="https://disinfo.quaidorsay.fr/en/open-terms-archive/experiments"
              center={true}
              white={true}
            />
            <Card
              image="/images/reuses/scripta-manent.jpg"
              title={t('homepage:reuses.scripta_manent.title')}
              subtitle={t('homepage:reuses.scripta_manent.subtitle')}
              author={t('homepage:reuses.scripta_manent.author')}
              link="https://disinfo.quaidorsay.fr/fr/open-terms-archive/scripta-manent"
              center={true}
              white={true}
            />
            <Card
              image="/images/reuses/tosback.jpg"
              title={t('homepage:reuses.tosback.title')}
              subtitle={t('homepage:reuses.tosback.subtitle')}
              author={t('homepage:reuses.tosback.author')}
              link="https://tosback.org/"
              center={true}
              white={true}
            />
            <Card
              image="/images/reuses/new-reuse.png"
              className="text__center"
              title={t('homepage:reuses.new_reuse.title')}
              subtitle={t('homepage:reuses.new_reuse.subtitle')}
              link="mailto:contact@opentermsarchive.org"
              center={true}
              white={true}
            />
          </CardList>
        </Container>
      </Container>

      {/* Product newsletter */}
      <Container layout="wide" dark={true} paddingY={false}>
        <Container gridCols="9" gridGutters="8" flex={true}>
          <Column width={40} alignX="center" alignY="center">
            <IconMail size="128" color="var(--colorBlack400)" strokeWidth="1" />
          </Column>
          <Column width={60} subtitle={t('homepage:product-newsletter.title')}>
            <TextContent marginTop={false}>
              <p className="mt__M">{t('homepage:product-newsletter.desc')}</p>
              <form
                id="sib-form"
                method="POST"
                action={t('homepage:product-newsletter.form.action')}
                data-type="subscription"
              >
                <div className="formfield mb__L">
                  <input
                    type="email"
                    id="email"
                    name="EMAIL"
                    autoComplete="email"
                    placeholder={t('homepage:product-newsletter.input.email.placeholder')}
                    required
                  />
                </div>

                <div className="formfield formfield__alignRight">
                  <Button form="sib-form" submit={true}>
                    {t('homepage:product-newsletter.button.label')}
                  </Button>
                  <input type="hidden" name="locale" value={router.locale} />
                </div>
              </form>
            </TextContent>
          </Column>
        </Container>
      </Container>

      {/* FOSS & Contributors */}
      <Container layout="wide">
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
