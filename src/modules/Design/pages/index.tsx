import LinkArrow from 'modules/Common/components/LinkArrow';
import Logo from 'modules/Common/components/Logo';
import Layout from 'modules/Common/containers/Layout';

const DesignPage = () => {
  return (
    <Layout>
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
        donec. Ac fermentum risus arcu aliquam egestas neque lacinia at. Id vel amet tristique quis
        justo urna mattis eget. Faucibus sem nibh accumsan, felis, in hendrerit sed. Nullam volutpat
        potenti sollicitudin odio at quam varius. Ac sollicitudin lacus, et quis sed dignissim.
        Posuere dignissim scelerisque hendrerit semper. Tortor adipiscing sed ac, sit.
      </p>
      <p>
        Quam sollicitudin augue suspendisse tempus. Id pharetra duis at felis. Massa vitae eget
        viverra sit. <span class="text__light">Odio vitae lorem proin</span> sit neque, elementum
        cum tempor metus. Turpis sociis felis vitae diam et scelerisque tempor nunc. Feugiat eget
        aliquet metus egestas. <span class="text__smallcaps">Vulputate habitant a</span> lectus
        tincidunt quam in. Scelerisque consectetur erat at tristique mauris. Scelerisque dapibus
        felis sagittis sed. Metus tortor pellentesque feugiat morbi eu rutrum varius risus nisl.
        Tortor ac semper pharetra senectus.
      </p>
      <LinkArrow iconColor="#999999" href="http://www.google.fr">
        Test de link
      </LinkArrow>
      <Logo fill="#010613" />
    </Layout>
  );
};

export default DesignPage;
