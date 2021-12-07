import { FiArrowRightCircle, FiChevronDown } from 'react-icons/fi';

import Article from 'modules/Common/components/Article';
import Aside from 'modules/Common/components/Aside';
import Button from 'modules/Common/components/Button';
import ButtonBlock from 'modules/Common/components/ButtonBlock';
import ButtonBlockList from 'modules/Common/components/ButtonBlockList';
import Column from 'modules/Common/components/Column';
import Container from 'modules/Common/containers/Container';
import FeatureItem from 'modules/Common/components/FeatureItem';
import FeatureList from 'modules/Common/components/FeatureList';
import Hero from 'modules/Common/components/Hero';
import Layout from 'modules/Common/containers/Layout';
import LinkIcon from 'modules/Common/components/LinkIcon';
import Logo from 'modules/Common/components/Logo';
import React from 'react';
import ShowcaseItem from 'modules/Common/components/Card';
import ShowcaseList from 'modules/Common/components/CardList';
import TextContent from 'modules/Common/components/TextContent';
import ThumbGalery from 'modules/Common/components/ThumbGalery';
import ThumbGaleryItem from 'modules/Common/components/ThumbGaleryItem';
import classNames from 'classnames';

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
        <LinkIcon iconColor="var(--colorBlack400)" href="http://www.google.fr">
          Test de link
        </LinkIcon>
        <br />
        <LinkIcon iconColor="var(--colorBlack400)" href="http://www.google.fr" small={true}>
          Test de link
        </LinkIcon>
        <br />
        <LinkIcon iconColor="var(--colorBlack400)" href="http://www.google.fr" direction="left">
          Test de link inversé
        </LinkIcon>
        <Logo fill="#010613" />
        <div className={classNames('select')}>
          <select>
            <option value="">select moi</option>
            <option value="">ou pas</option>
          </select>
          <FiChevronDown color="333333"></FiChevronDown>
        </div>
      </Container>

      {/* Hero with background, darked, title and subtitle */}
      <Container layout="wide" dark={true} paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Hero
            title="Hero with background, dark, title and subtitle"
            subtitle="Services have terms that can change over time. Open Terms Archive enables users rights advocates, regulatory bodies and any interested citizen to follow the changes to these terms."
          ></Hero>
        </Container>
      </Container>

      {/* Hero with title and subtitle, without image background, no darked */}
      <Container layout="wide" paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Hero
            title="Hero with title and subtitle, without image background, no darked"
            subtitle="Minim ea sit commodo quis proident consequat dolor consequat deserunt aliquip fugiat ad ad sint. Exercitation aute commodo quis aliquip aute minim nostrud quis enim dolor laboris do enim. Fugiat veniam fugiat enim eu voluptate cillum ullamco proident eiusmod proident sunt. Fugiat mollit reprehenderit Lorem incididunt officia do ipsum ea aliqua. Do pariatur ea sit elit aute esse aliquip qui amet consequat tempor laborum. Ex laborum quis enim aliqua qui consequat duis mollit id quis ipsum. Anim enim ut et mollit qui consequat est aliquip id officia."
          ></Hero>
        </Container>
      </Container>

      {/* Hero with title only */}
      <Container layout="wide" paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Hero title="Hero with title only"></Hero>
        </Container>
      </Container>

      {/* Hero with subtitle only */}
      <Container layout="wide" paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Hero subtitle="Hero with subtitle only"></Hero>
        </Container>
      </Container>

      {/* Article with Aside */}
      <Container gridCols="10" gridGutters="11" flex={true}>
        <Article subtitle="Subtitle" title="Lorem ipsum dolor" titleLevel="h2">
          <TextContent>
            <p>
              Adipisicing mollit aliquip qui anim exercitation ipsum qui velit consectetur. Nisi
              magna qui esse ex esse dolore <strong>commodo</strong> id ipsum Lorem enim pariatur eu
              commodo. Occaecat commodo aliquip reprehenderit amet aute tempor sint nostrud
              excepteur.
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
          </TextContent>
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

      {/* Button Bloc List */}
      <Container gridCols="12" gridGutters="11">
        <ButtonBlockList title="Want to help us build a digital common ?" subtitle="Contribute 2">
          <ButtonBlock
            title="Add documents"
            desc="Easily and quickly add documents to follow."
            iconName="FiPlus"
            iconColor="var(--colorPrimary)"
          >
            <Button href="https://www.google.fr">Je suis un bouton</Button>
          </ButtonBlock>
          <ButtonBlock
            desc="Without title un button bloc avec un descirption un peu plus longue pour voir comment ça se comporte. Ouias ouias !"
            iconName="FiPlus"
            iconColor="var(--colorPrimary)"
          >
            <Button href="https://www.google.fr">Add documents</Button>
            <LinkIcon iconColor="var(--colorBlack400)" href="https://www.google.fr" small={true}>
              Another link
            </LinkIcon>
          </ButtonBlock>
          <ButtonBlock title="Un titre un peu plus long" desc="Un bloc sans icon">
            <Button href="https://www.google.fr">Je suis un bouton</Button>
          </ButtonBlock>
          <ButtonBlock
            desc="Without title un button bloc avec un descirption un peu plus longue pour voir comment ça se comporte. Ouias ouias !"
            iconName="FiPlus"
            iconColor="var(--colorPrimary)"
          >
            <Button href="https://www.google.fr">Add documents</Button>
            <LinkIcon iconColor="var(--colorBlack400)" href="https://www.google.fr" small={true}>
              Another link
            </LinkIcon>
          </ButtonBlock>
          <ButtonBlock title="Un titre un peu plus long" desc="Un bloc sans icon">
            <Button href="https://www.google.fr">Je suis un bouton</Button>
          </ButtonBlock>
        </ButtonBlockList>
      </Container>

      {/* Columns width 50/50, background image, darked, x center, y center*/}
      <Container layout="wide" paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false} dark={true}>
          <Column width={50} alignX="center" alignY="center">
            <Logo fill="#fefffd" />
          </Column>
          <Column width={50} title="Un titre un peu plus long" subtitle="Culpa tempor">
            <TextContent>
              <p>
                Large digital companies today occupy a central position which, through the ToS,
                allows them to transform their practices and values ​​into de facto standards which
                are at the heart of many aspects of our existence and our economies.{' '}
              </p>
              <p>
                However, they communicate in an insufficiently clear, readable and continuous manner
                on these ToS, whereas rigorously understanding the ToS and how they have evolved
                over time has become essential to appreciate the practices and loyalty of these
                digital players.{' '}
              </p>
              <p>This understanding is also necessary to:</p>
              <ul>
                <li>
                  <FiArrowRightCircle color="#0496FF" />
                  each user so that he can identify precisely what he has agreed upon, the data he
                  has shared, the rights he has yielded to the services and the rights he has
                  retained;
                </li>
                <li>
                  <FiArrowRightCircle color="#0496FF" />
                  the authorities in order to verify the compatibility of these contractual
                  frameworks with national and supranational law, in particular when the latter
                  evolve;
                </li>
                <li>
                  <FiArrowRightCircle color="#0496FF" />
                  regulators so that they can assess the efforts of the platforms, but also to make
                  sure that they say what they do and that they do what they say. It creates
                  transparency in the practices of digital players, in line with the first
                  recommendations discussed within the framework of the DSA and the DMA.
                </li>
              </ul>
            </TextContent>
          </Column>
        </Container>
      </Container>

      {/* Column width 75/25 */}
      <Container layout="wide" paddingY={false}>
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <Column width={75} title="Un titre un peu plus long" subtitle="Culpa tempor">
            <TextContent>
              <p>
                Large digital companies today occupy a central position which, through the ToS,
                allows them to transform their practices and values ​​into de facto standards which
                are at the heart of many aspects of our existence and our economies.{' '}
              </p>
              <p>
                However, they communicate in an insufficiently clear, readable and continuous manner
                on these ToS, whereas rigorously understanding the ToS and how they have evolved
                over time has become essential to appreciate the practices and loyalty of these
                digital players.{' '}
              </p>
              <p>This understanding is also necessary to:</p>
              <ul>
                <li>
                  <FiArrowRightCircle color="#0496FF" />
                  each user so that he can identify precisely what he has agreed upon, the data he
                  has shared, the rights he has yielded to the services and the rights he has
                  retained;
                </li>
                <li>
                  <FiArrowRightCircle color="#0496FF" />
                  the authorities in order to verify the compatibility of these contractual
                  frameworks with national and supranational law, in particular when the latter
                  evolve;
                </li>
                <li>
                  <FiArrowRightCircle color="#0496FF" />
                  regulators so that they can assess the efforts of the platforms, but also to make
                  sure that they say what they do and that they do what they say. It creates
                  transparency in the practices of digital players, in line with the first
                  recommendations discussed within the framework of the DSA and the DMA.
                </li>
              </ul>
            </TextContent>
          </Column>
        </Container>
      </Container>

      {/* Showcase */}
      <Container gridCols="10" gridGutters="11" flex={true} paddingY={false} id="build-with">
        <Column width={50} title="Built in" subtitle="Showcase">
          <ShowcaseList>
            <ShowcaseItem
              title="Scripta Manent"
              desc="Explore the contractual documents of the main online service providers and compare their evolution through time."
              author="By the team of the French Ambassador for Digital Affairs"
            >
              <LinkIcon iconColor="var(--colorPrimary)" href="https://www.google.fr">
                Try
              </LinkIcon>
            </ShowcaseItem>
            <ShowcaseItem
              title="Disinfo experiments"
              desc="Experiments are ongoing so as to produce use cases using Open Terms Archive data."
              author="By the team of the French Ambassador for Digital Affairs"
            >
              <LinkIcon iconColor="var(--colorPrimary)" href="https://www.google.fr">
                See
              </LinkIcon>
            </ShowcaseItem>
          </ShowcaseList>
        </Column>
        <Column width={50} alignX="center" alignY="center">
          <ButtonBlock
            title="Have you developed an Open Terms Archive based tool?"
            desc="Let the community know about it here"
            fillParent={true}
          >
            <Button href="https://www.google.fr">Contact us</Button>
          </ButtonBlock>
        </Column>
      </Container>

      {/* Partners */}
      <Container paddingY={false} layout="fluid">
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false}>
          <ThumbGalery
            title="Our Partners"
            titleLevel="h3"
            subtitle="They make Open Terms Archive existing"
          >
            <ThumbGaleryItem src="/images/logo-ambnum.png" width="158" height="80" />
            <ThumbGaleryItem src="/images/logo-gdi.png" width="150" height="32" />
            <ThumbGaleryItem src="/images/logo-peren.png" width="110" height="84" />
          </ThumbGalery>
        </Container>
      </Container>

      {/* Press */}
      <Container paddingY={false} gray={true} layout="fluid">
        <Container gridCols="12" gridGutters="11" flex={true} paddingX={false} paddingYSmall={true}>
          <ThumbGalery
            title="Press"
            titleLevel="h4"
            subtitle="They talk about Open Terms Archive"
            small={true}
          >
            <ThumbGaleryItem src="/images/01net.png" width="75" height="32" small={true} />
            <ThumbGaleryItem src="/images/labofnac.png" width="125" height="18" small={true} />
            <ThumbGaleryItem src="/images/nextimpact.png" width="122" height="30" small={true} />
            <ThumbGaleryItem src="/images/numerama.png" width="119" height="24" small={true} />
            <ThumbGaleryItem src="/images/zdnet.png" width="76" height="50" small={true} />
            <ThumbGaleryItem src="/images/wired.png" width="112" height="20" small={true} />
          </ThumbGalery>
        </Container>
      </Container>
    </Layout>
  );
};

export default DesignPage;
