import { withI18n } from 'modules/I18n';

export const getStaticProps = withI18n({ load: 'mdx', filename: 'contribute/thanks' })();

export { default } from 'modules/Contribute/pages/thanks';
