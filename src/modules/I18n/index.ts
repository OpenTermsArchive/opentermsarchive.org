import { GetStaticProps, GetStaticPropsContext } from 'next';

import { SSRConfig } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type HasCallback<T> = T extends undefined
  ? GetStaticProps<SSRConfig>
  : Promise<GetStaticPropsContext & SSRConfig>;

export const withI18n = (namespaces: string[]) => (callback?: GetStaticProps<SSRConfig>) => {
  const getResponseWithI18nProps: HasCallback<typeof callback> = async (props) => {
    const i18nProps = await serverSideTranslations(
      props.locale || props.defaultLocale || '',
      namespaces
    );
    const computedProps = {
      ...props,
      ...i18nProps,
    };

    if (!callback) {
      return JSON.parse(
        JSON.stringify({
          props: computedProps,
        })
      );
    }

    return callback(computedProps);
  };

  return getResponseWithI18nProps;
};
