import SubscribeForm, { SubscribeFormProps } from 'modules/Common/components/SubscribeForm';

import Container from 'modules/Common/containers/Container';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import React from 'react';
import api from 'utils/api';
import { getServices } from 'modules/OTA-api/api';
import useNotifier from 'hooks/useNotifier';
import { useToggle } from 'react-use';
import { useTranslation } from 'modules/I18n';
import useUrl from 'hooks/useUrl';

export default function SubscribePage({ services }: any) {
  const { t } = useTranslation();
  const [subscribing, toggleSubscribing] = useToggle(false);
  const { notify } = useNotifier();
  const { queryParams, pushQueryParams } = useUrl();

  const onSubscription: SubscribeFormProps['onSubmit'] = async (data) => {
    let success;
    toggleSubscribing(true);

    try {
      await api.post(`/api/subscribe`, {
        email: data.email,
        service: data.service,
        documentType: data.documentType,
      });
      notify('success', t('common:subscribe_form.success'));
      success = true;
    } catch (err) {
      notify('error', t('common:subscribe_form.error'));
      success = false;
    }
    toggleSubscribing(false);
    return success;
  };

  return (
    <Layout title={t('subscribe:seo.title')} desc={t('subscribe:seo.desc')}>
      <Container layout="wide" dark={true} paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Hero title={t('subscribe:hero.title')} subtitle={t('subscribe:hero.subtitle')}></Hero>
        </Container>
      </Container>

      <Container gridCols="9" gridGutters="8" flex={true}>
        <SubscribeForm
          defaultServices={services}
          onSubmit={onSubscription}
          loading={subscribing}
          onChange={(data) => pushQueryParams(data, undefined, { shallow: true })}
          defaultValues={{
            service: queryParams.service,
            documentType: queryParams.documentType,
          }}
        />
      </Container>
    </Layout>
  );
}
export const getStaticProps = async (props: any) => {
  const services = await getServices();
  return JSON.parse(JSON.stringify({ props: { ...props, services }, revalidate: 10 }));
};
