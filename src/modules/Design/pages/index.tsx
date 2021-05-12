import Article from 'modules/Common/components/Article';
import Aside from 'modules/Common/components/Aside';
import LinkArrow from 'modules/Common/components/LinkArrow';
import Logo from 'modules/Common/components/Logo';
import Container from 'modules/Common/containers/Container';
import Layout from 'modules/Common/containers/Layout';
import FeatureList from 'modules/Common/components/FeatureList';
import FeatureItem from 'modules/Common/components/FeatureItem';

const DesignPage = () => {
  return (
    <Layout>
      <Container layout="fluid">
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam orci potenti
          phasellus sed.
        </h1>
        <h2>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam orci potenti
          phasellus sed.
        </h2>
        <h3>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam orci potenti
          phasellus sed.
        </h3>
        <h4>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam orci potenti
          phasellus sed.
        </h4>
        <p>
          Rhoncus, <a href="https://www.google.fr">hendrerit auctor quis</a> malesuada sollicitudin
          donec. Ac fermentum risus arcu aliquam egestas neque lacinia at. Id vel amet tristique
          quis justo urna mattis eget. Faucibus sem nibh accumsan, felis, in hendrerit sed. Nullam
          volutpat potenti sollicitudin odio at quam varius. Ac sollicitudin lacus, et quis sed
          dignissim. Posuere dignissim scelerisque hendrerit semper. Tortor adipiscing sed ac, sit.
        </p>
        <p>
          Quam sollicitudin augue suspendisse tempus. Id pharetra duis at felis. Massa vitae eget
          viverra sit. <span className="text__light">Odio vitae lorem proin</span> sit neque,
          elementum cum tempor metus. Turpis sociis felis vitae diam et scelerisque tempor nunc.
          Feugiat eget aliquet metus egestas.
          <span className="text__smallcaps">Vulputate habitant a</span> lectus tincidunt quam in.
          Scelerisque consectetur erat at tristique mauris. Scelerisque dapibus felis sagittis sed.
          Metus tortor pellentesque feugiat morbi eu rutrum varius risus nisl. Tortor ac semper
          pharetra senectus.
        </p>
        <LinkArrow iconColor="#999999" href="http://www.google.fr">
          Test de link
        </LinkArrow>
        <Logo fill="#010613" />
      </Container>
      <Container gridCols="10" gridGutters="11" flex={true}>
        <Article subtitle="Subtitle" title="Lorem ipsum dolor" titleLevel="h2">
          <p>
            Adipisicing mollit aliquip qui anim exercitation ipsum qui velit consectetur. Nisi magna
            qui esse ex esse dolore commodo id ipsum Lorem enim pariatur eu commodo. Occaecat
            commodo aliquip reprehenderit amet aute tempor sint nostrud excepteur.
          </p>
          <p>
            Et ex nostrud consequat cupidatat qui cillum ad incididunt. Et elit ex nulla cupidatat
            magna culpa. Duis est Lorem eiusmod pariatur reprehenderit. Et nulla aliquip deserunt
            ipsum culpa mollit labore sit exercitation officia reprehenderit est irure tempor.
          </p>
          <p>
            Commodo et dolor sit exercitation amet ad elit commodo. Quis anim irure incididunt
            adipisicing Lorem minim minim nisi. Do incididunt incididunt deserunt adipisicing
            nostrud amet. Ea mollit pariatur proident consequat enim occaecat consectetur. In
            adipisicing voluptate cillum adipisicing reprehenderit mollit in dolore occaecat nisi.
            Id eu adipisicing do minim magna quis eu esse anim proident aliqua.
          </p>
        </Article>
        <Aside>
          <FeatureList>
            <FeatureItem
              iconName="FiSmile"
              title="Open Source"
              desc="Free and collaborative software, any entity can contribute to improve it."
            />
            <FeatureItem
              iconName="FiBox"
              title="180 services"
              desc="Google, Amazon, Apple, AirBnB, Facebook, Twitter, Instagram, Bing, Microsoft, Reddit, Youtube, TikTok..."
            />
            <FeatureItem
              iconName="FiFile"
              title="540 documents"
              desc="Terms of Service, Privacy Policy, Trackers Policy, Developer Terms, Community Guidelines..."
            />
          </FeatureList>
        </Aside>
      </Container>
    </Layout>
  );
};

export default DesignPage;
