import { WithI18nResult, withI18n } from 'modules/I18n';

import Button from 'modules/Common/components/Button';
import Container from 'modules/Common/containers/Container';
import Layout from 'modules/Common/containers/Layout';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import TextContent from 'modules/Common/components/TextContent';
import { useTranslation } from 'next-i18next';

export default function LegalNoticePage({ mdxContent }: WithI18nResult) {
  const { t } = useTranslation(['common', 'legal-notice']);

  return (
    <Layout
      title={t('seo.title', { ns: 'legal-notice' })}
      desc={t('seo.desc', { ns: 'legal-notice' })}
    >
      <Container gridCols="10" gridGutters="9" paddingX={false}>
        <TextContent>
          <MDXRemote {...(mdxContent as any)} components={{ Button }} />
        </TextContent>
      </Container>
    </Layout>
  );
}

export const getStaticProps = withI18n({ load: 'mdx', filename: 'legal-notice' })();
