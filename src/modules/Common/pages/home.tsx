import Search, { SearchProps } from 'components/Search';

// import { CreateHashtagResponse } from 'modules/Common/interfaces';
// import LastHashtags from '../data-components/LastHashtags';
import Layout from 'modules/Embassy/components/Layout';
// import api from 'utils/api';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();
  const onSubmit: SearchProps['onSearchSubmit'] = async (name) => {
    try {
      console.log(''); // eslint-disable-line
      console.log('════START══bname══════════════════════════════════════════════════'); // eslint-disable-line
      console.log(name); // eslint-disable-line
      console.log('════END════bname══════════════════════════════════════════════════'); // eslint-disable-line

      // const { data } = await api.post<CreateHashtagResponse>('/api/hashtags', { name: hashtag });
      router.push(`/terms/${encodeURI(name)}`);
    } catch (e) {
      console.log(''); // eslint-disable-line
      console.log('╔════START══e══════════════════════════════════════════════════'); // eslint-disable-line
      console.log(e); // eslint-disable-line
      console.log('╚════END════e══════════════════════════════════════════════════'); // eslint-disable-line
    }
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
            <p
              className="rf-text--lg text-center rf-mb-7w"
              style={{ maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}
            >
              Thanks
            </p>
            <Search
              className="rf-mx-md-12w"
              label="First step, please fill the URL to track"
              buttonLabel="Next"
              placeholder="https://www.amazon.com/gp/help/customer/display.html?nodeId=13819201"
              onSearchSubmit={onSubmit}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
