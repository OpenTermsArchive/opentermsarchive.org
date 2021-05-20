import { getDocumentTypes } from 'modules/Github/api';
import { withI18n } from 'modules/I18n';

export { default } from 'modules/Contribute/pages/service';

export const getStaticProps = withI18n()(async (props: any) =>
  JSON.parse(
    JSON.stringify({
      props: { ...props, documentTypes: await getDocumentTypes() },
    })
  )
);
