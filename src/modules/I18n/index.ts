import { GetStaticProps, GetStaticPropsContext } from 'next';

import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { SSRConfig } from 'next-i18next';
import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type HasCallback<T> = T extends undefined
  ? GetStaticProps<SSRConfig & WithI18nOptionsResult>
  : Promise<GetStaticPropsContext & SSRConfig & WithI18nOptionsResult>;

interface WithI18nOptions {
  namespaces?: string[];
  load?: 'mdx';
}

interface WithI18nOptionsResult {
  mdxContent?: MDXRemoteSerializeResult;
}

export type WithI18nResult = GetStaticPropsContext & SSRConfig & WithI18nOptionsResult;

export const withI18n =
  (options: WithI18nOptions = {}) =>
  (callback?: GetStaticProps<WithI18nResult>) => {
    const getResponseWithI18nProps: HasCallback<typeof callback> = async (props) => {
      const i18nProps = await serverSideTranslations(
        props.locale || props.defaultLocale || '',
        options.namespaces || []
      );

      const computedProps: WithI18nResult = {
        ...props,
        ...i18nProps,
        defaultLocale: 'en',
      };

      if (options.load === 'mdx') {
        const { name: filename } = path.parse(__filename);

        const pagesDir = `${process.env.PWD}/src/pages`;
        let content = '';
        try {
          content = fs.readFileSync(`${pagesDir}/${filename}.${props.locale}.mdx`).toString();
        } catch (e) {
          try {
            content = fs
              .readFileSync(`${pagesDir}/${filename}.${props.defaultLocale}.mdx`)
              .toString();
          } catch (e) {
            content = '';
          }
        }

        computedProps.mdxContent = await serialize(content);
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
