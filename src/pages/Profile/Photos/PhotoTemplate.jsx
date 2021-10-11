import PropTypes from 'prop-types';
import Text from 'components/Text';
import { Image, PhotoContainer, PhotoText } from './style';

const PhotoTemplate = ({ item }) => (
  <PhotoContainer>
    <Image src={item.url} alt={item.title} />
    <Text margin={{ left: 2 }} component={PhotoText}>
      {item.title}
    </Text>
  </PhotoContainer>
);

PhotoTemplate.propTypes = {
  item: PropTypes.object.isRequired,
};

export default PhotoTemplate;
