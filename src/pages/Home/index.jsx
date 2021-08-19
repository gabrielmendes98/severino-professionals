import Carousel from 'react-slick';
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';

import joinUs from 'assets/doodles/join-us.svg';
import goingUp from 'assets/doodles/going-up.svg';
import Text from 'components/Text';
import Doodle from 'components/Doodle';
import { Grid } from 'components/Styled';
import { carouselItems, carouselSettings } from './util';
import CarouselItem from './CarouselItem';
import { Wrapper, WhiteButton } from './style';

const Home = () => (
  <Grid container distance={{ bottom: 20 }}>
    <Grid item xs={12} margin={{ bottom: 10 }}>
      <Container maxWidth="lg">
        <Carousel {...carouselSettings}>
          {carouselItems.map((item, index) => (
            <CarouselItem
              key={index}
              doodle={item.doodle}
              title={item.title}
              subtitle={item.subtitle}
            />
          ))}
        </Carousel>
      </Container>
    </Grid>
    <Wrapper>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={9}>
            <Text color="white" size={1.4}>
              Faça parte
            </Text>
            <Text color="white" margin={{ bottom: 2 }}>
              Seja um profissional do Severino e divulgue seu trabalho
              gratuitamente
            </Text>
            <WhiteButton variant="contained" component={Link} to="/sign-up">
              Cadastre-se
            </WhiteButton>
          </Grid>
          <Grid item xs={3}>
            <Doodle size={25} src={joinUs} />
          </Grid>
        </Grid>
      </Container>
    </Wrapper>
    <Container maxWidth="lg">
      <Grid container alignItems="center" margin={{ top: 5 }}>
        <Grid item xs={3}>
          <Doodle size={25} src={goingUp} />
        </Grid>
        <Grid item xs={9}>
          <Text size={1.1}>
            Severino é uma plataforma para pessoas encontrarem profissionais que
            consigam resolver seus problemas. Por isso, ao se cadastrar como um
            profissional da plataforma, você terá seu trabalho divulgado
            gratuitamente para milhares de pessoas. Disponibilizamos um cadastro
            de currículo, fotos de seus serviços e avaliações dos usuários para
            qualificar seu trabalho.
          </Text>
        </Grid>
      </Grid>
    </Container>
  </Grid>
);

export default Home;
