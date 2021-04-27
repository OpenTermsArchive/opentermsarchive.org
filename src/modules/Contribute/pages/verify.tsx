import Breadcrumb from 'components/BreadCrumb';
// import { CreateHashtagResponse } from 'modules/Common/interfaces';
// import LastHashtags from '../data-components/LastHashtags';
import Layout from 'modules/Embassy/components/Layout';
import axios from 'axios';
import s from './verify.module.scss';
// import api from 'utils/api';
import useUrl from 'hooks/useUrl';

const DOCUMENT_TYPES_URL =
  'https://raw.githubusercontent.com/ambanum/OpenTermsArchive/master/scripts/rewrite/renamer/rules/documentTypes.json';

const VerifyPage = ({ documentTypes }: { documentTypes: any }) => {
  const {
    queryParams: { url, selectedCss: initialSelectedCss, removedCss: initialRemovedCss },
    pushQueryParam,
  } = useUrl();

  const json = {
    name: '',
    documents: {
      'Document Name': {
        fetch: url,
        select: initialSelectedCss,
        remove: initialRemovedCss,
      },
    },
  };

  return (
    <Layout title="Contributing to Open Terms Archive">
      <div className="rf-container rf-mb-12w">
        <div className="rf-grid-row">
          <div className="rf-col">
            <h1 className="text-center rf-mb-1w">
              Contributing to Open Terms Archive
              <sup>
                <span
                  style={{
                    background: 'var(--rm500)',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                  className="rf-tag rf-tag--sm"
                >
                  BETA
                </span>
              </sup>
            </h1>
            <Breadcrumb
              className={s.breadcrumb}
              items={[
                { name: 'Open Terms Archive', url: 'https://www.opentermsarchive.org' },
                { name: 'Add a document', url: '/contribute' },
                { name: 'Verify informations' },
              ]}
            />
            <h3>Verify informations (last step)</h3>

            <h3>Optional Additional Informations</h3>
            <p>
              If you wish, you can add additional information, please refer to the{' '}
              <a
                href="https://github.com/ambanum/OpenTermsArchive#adding-a-new-service"
                target="_blank"
                rel="noopener noreferrer"
              >
                documentation
              </a>{' '}
              on the contribution guide.
            </p>

            <pre style={{ maxWidth: '400px', overflow: 'auto' }}>
              {JSON.stringify(json, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const { data: documentTypes } = await axios.get(DOCUMENT_TYPES_URL);

  return {
    props: { documentTypes: [...new Set(Object.values(documentTypes))].sort() },
  };
}

export default VerifyPage;
