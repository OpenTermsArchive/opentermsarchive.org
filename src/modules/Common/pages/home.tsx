import Layout from 'modules/Embassy/components/Layout';
import Link from 'next/link';

const HomePage = () => {
  return (
    <Layout title="Contributing to Open Terms Archive">
      <div className="rf-container rf-mb-12w">
        <div className="rf-grid-row">
          <div className="rf-col">
            <h1 className="text-center rf-mb-1w">Open Terms Archive</h1>
            <p
              className="rf-text--lg text-center rf-mb-7w"
              style={{ maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}
            >
              Homepage
            </p>
            <Link href={'/contribute'}>
              <a className="rf-btn">Contribute</a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
