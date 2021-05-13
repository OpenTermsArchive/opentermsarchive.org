import { withI18n } from 'modules/I18n';
import { getDocumentTypes } from 'modules/Github/api';

export { default } from 'modules/Contribute/pages/service';

export const getStaticProps = withI18n(['contribute'])(async (props: any) => ({
  props: { ...props, documentTypes: await getDocumentTypes() },
}));
