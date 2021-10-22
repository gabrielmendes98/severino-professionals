import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Text from 'components/Text';
import Doodle from 'components/Doodle';

const CarouselItem = ({ doodle, title, subtitle }) => (
  <Grid container alignItems="center" spacing={3}>
    <Grid container item xs={12} sm={6} justifyContent="center">
      <Doodle size={25} src={doodle} />
    </Grid>
    <Grid container item xs={12} sm={6}>
      <Grid item xs={12}>
        <Text size={1.4}>{title}</Text>
      </Grid>
      <Grid item xs={12}>
        <Typography>{subtitle}</Typography>
      </Grid>
    </Grid>
  </Grid>
);

CarouselItem.propTypes = {
  doodle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default CarouselItem;
