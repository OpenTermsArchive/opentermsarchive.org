import Layout from '../containers/Layout';
import SubscribeForm from '../components/SubscribeForm';

const HomePage = () => {
  return (
    <Layout>
      <h1>Follow the changes to the terms of service</h1>
      <h2>
        Services have terms that can change over time. Open Terms Archive enables users rights
        advocates, regulatory bodies and any interested citizen to follow the changes to these
        terms.
      </h2>
      <SubscribeForm />
    </Layout>
  );
};

export default HomePage;
