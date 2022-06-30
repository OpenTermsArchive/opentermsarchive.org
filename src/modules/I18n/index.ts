import { GetStaticProps, GetStaticPropsContext } from 'next';

import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { SSRConfig } from 'next-i18next';
import fs from 'fs';
import i18nConfig from './next-i18next.config';
import rehypeAttr from 'rehype-attr';
import { serialize } from 'next-mdx-remote/serialize';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type HasCallback<T> = T extends undefined
  ? GetStaticProps<SSRConfig & WithI18nOptionsResult>
  : Promise<GetStaticPropsContext & SSRConfig & WithI18nOptionsResult>;

interface WithI18nOptionsSimple {
  namespaces?: string[];
}
interface WithI18nOptionsMdx {
  namespaces?: string[];
  load: 'mdx';
  filename: string;
}

type WithI18nOptions = WithI18nOptionsSimple | WithI18nOptionsMdx;
interface WithI18nOptionsResult {
  mdxContent?: MDXRemoteSerializeResult;
}

export type WithI18nResult = GetStaticPropsContext & SSRConfig & WithI18nOptionsResult;

export const withI18n =
  (options: WithI18nOptions = {}) =>
  (callback?: GetStaticProps<WithI18nResult>) => {
    const getResponseWithI18nProps: HasCallback<typeof callback> = async (props) => {
      const i18nProps = await serverSideTranslations(
        props.locale || 'en' || '',
        options.namespaces || i18nConfig.ns,
        {
          ...i18nConfig,
          i18n: {
            ...i18nConfig.i18n,
            locales: i18nConfig.i18n.locales.filter((locale: string) => locale !== 'default'),
            defaultLocale: 'en',
          },
        }
      );
      const computedProps: WithI18nResult = {
        ...props,
        ...i18nProps,
      };

      if ((options as WithI18nOptionsMdx)?.load === 'mdx') {
        const translationsDir = `${process.env.PWD}/${i18nConfig.i18n.localePath}`;
        let content = '';
        try {
          content = fs
            .readFileSync(
              `${translationsDir}/${props.locale}/${(options as WithI18nOptionsMdx)?.filename}.mdx`
            )
            .toString();
        } catch (e) {
          try {
            content = fs
              .readFileSync(
                `${translationsDir}/${props.defaultLocale}/${
                  (options as WithI18nOptionsMdx)?.filename
                }.mdx`
              )
              .toString();
          } catch (e) {
            content = '';
          }
        }

        computedProps.mdxContent = await serialize(content, {
          mdxOptions: {
            rehypePlugins: [
              [
                //@ts-ignore
                rehypeAttr,
                { properties: 'attr' },
              ],
            ],
          },
        });
      }

      if (!callback) {
        return JSON.parse(
          JSON.stringify({
            props: computedProps,
            revalidate: 60,
          })
        );
      }

      return callback(computedProps);
    };

    return getResponseWithI18nProps;
  };
