import { Container, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import { SEVERINO_CLIENTS_WEBSITE, SEVERINO_EMAIL } from 'commons/constants';
import PAGE_URL from 'commons/constants/routes';
import Text from 'components/Text';
import { Grid } from 'components/Styled';
import { FooterContainer, StyledAppBrand } from './style';

const Footer = () => (
  <Grid container margin={{ top: 10 }} component={FooterContainer}>
    <Container maxWidth="xl" style={{ display: 'flex' }}>
      <Grid container item sm={4} justifyContent="center">
        <Grid container item xs={12} justifyContent="center">
          <StyledAppBrand />
        </Grid>
        <Grid item xs={1}>
          <IconButton aria-label="facebook">
            <FacebookIcon />
          </IconButton>
        </Grid>
        <Grid item xs={1}>
          <IconButton aria-label="twitter">
            <TwitterIcon />
          </IconButton>
        </Grid>
        <Grid item xs={1}>
          <IconButton aria-label="instagram">
            <InstagramIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container item sm={4} alignContent="center" direction="column">
        <Text color="secondary" weight="bold" size={1.1} margin={{ bottom: 2 }}>
          Ajuda &amp; Dúvidas
        </Text>
        <Text margin={{ bottom: 2 }}>
          <a href={SEVERINO_CLIENTS_WEBSITE} target="_blank" rel="noreferrer">
            Site dos clientes
          </a>
        </Text>
        <Text margin={{ bottom: 2 }}>
          <Link to={PAGE_URL.ABOUT_US}>Sobre nós</Link>
        </Text>
        <Text>
          <Link to={PAGE_URL.TERMS_AND_CONDITIONS}>Termos e condições</Link>
        </Text>
      </Grid>
      <Grid container item sm={4} alignContent="center" direction="column">
        <Text color="secondary" weight="bold" size={1.1} margin={{ bottom: 2 }}>
          Contatos
        </Text>
        <Text>
          <a href={`mailto:${SEVERINO_EMAIL}`}>severino@gmail.com</a>
        </Text>
      </Grid>
    </Container>
  </Grid>
);

export default Footer;
