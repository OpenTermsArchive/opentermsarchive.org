import Article from 'modules/Common/components/Article';
import Aside from 'modules/Common/components/Aside';
import LinkArrow from 'modules/Common/components/LinkArrow';
import Logo from 'modules/Common/components/Logo';
import Container from 'modules/Common/containers/Container';
import Layout from 'modules/Common/containers/Layout';
import FeatureList from 'modules/Common/components/FeatureList';
import FeatureItem from 'modules/Common/components/FeatureItem';
import ButtonBlocList from 'modules/Common/components/ButtonBlocList';
import ButtonBloc from 'modules/Common/components/ButtonBloc';
import Hero from 'modules/Common/components/Hero';
import React from 'react';
import Button from 'modules/Common/components/Button';

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
        <LinkArrow iconColor="#999999" href="http://www.google.fr" small={true}>
          Test de link
        </LinkArrow>
        <Logo fill="#010613" />
      </Container>
      <Container layout="wide" backgroundImage="/images/bg1.jpg">
        <Container gridCols="12" gridGutters="11" flex={true} padding={false}>
          <Hero
            title="Follow the changes to the Terms of Service"
            subTitle="Services have terms that can change over time. Open Terms Archive enables users rights advocates, regulatory bodies and any interested citizen to follow the changes to these terms."
          ></Hero>
        </Container>
      </Container>
      <Container layout="wide">
        <Container gridCols="12" gridGutters="11" flex={true} padding={false}>
          <Hero title="Hero without image background and subtitle" isDark={false}></Hero>
        </Container>
      </Container>
      <Container layout="wide">
        <Container gridCols="12" gridGutters="11" flex={true} padding={false}>
          <Hero subTitle="Hero without image background and title" isDark={false}></Hero>
        </Container>
      </Container>
      <Container gridCols="10" gridGutters="11" flex={true}>
        <Article subtitle="Subtitle" title="Lorem ipsum dolor" titleLevel="h2">
          <p>
            Adipisicing mollit aliquip qui anim exercitation ipsum qui velit consectetur. Nisi magna
            qui esse ex esse dolore <strong>commodo</strong> id ipsum Lorem enim pariatur eu
            commodo. Occaecat commodo aliquip reprehenderit amet aute tempor sint nostrud excepteur.
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
      <Container gridCols="12" gridGutters="11">
        <ButtonBlocList title="Want to help us build a digital common ?" subTitle="Contribute">
          <ButtonBloc
            title="Add documents"
            desc="Easily and quickly add documents to follow."
            iconName="FiPlus"
            iconColor="#0496FF"
          >
            <Button href="https://www.google.fr">Je suis un bouton</Button>
          </ButtonBloc>
          <ButtonBloc
            desc="Without title un button bloc avec un descirption un peu plus longue pour voir comment ça se comporte. Ouias ouias !"
            iconName="FiPlus"
            iconColor="#0496FF"
          >
            <Button href="https://www.google.fr">Add documents</Button>
            <LinkArrow iconColor="#999999" href="https://www.google.fr" small={true}>
              Another link
            </LinkArrow>
          </ButtonBloc>
          <ButtonBloc title="Un titre un peu plus long" desc="Un bloc sans icon">
            <Button href="https://www.google.fr">Je suis un bouton</Button>
          </ButtonBloc>
          <ButtonBloc
            desc="Without title un button bloc avec un descirption un peu plus longue pour voir comment ça se comporte. Ouias ouias !"
            iconName="FiPlus"
            iconColor="#0496FF"
          >
            <Button href="https://www.google.fr">Add documents</Button>
            <LinkArrow iconColor="#999999" href="https://www.google.fr" small={true}>
              Another link
            </LinkArrow>
          </ButtonBloc>
          <ButtonBloc title="Un titre un peu plus long" desc="Un bloc sans icon">
            <Button href="https://www.google.fr">Je suis un bouton</Button>
          </ButtonBloc>
        </ButtonBlocList>
        <ButtonBlocList title="Want to help us build a digital common ?" subTitle="Contribute">
          <ButtonBloc title="Un titre un peu plus long" desc="Un bloc sans icon">
            <Button href="https://www.google.fr">Je suis un bouton</Button>
          </ButtonBloc>
        </ButtonBlocList>
      </Container>
    </Layout>
  );
};

export default DesignPage;
