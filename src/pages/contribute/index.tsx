import { withI18n } from 'modules/I18n';

export const getStaticProps = withI18n(['contribute'])();

export { default } from 'modules/Contribute/pages/contribute';
