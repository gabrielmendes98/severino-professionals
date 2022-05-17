import PropTypes from 'prop-types';
import Text from 'components/Text';

const ServiceTemplate = ({ item }) => <Text>{item.name}</Text>;

ServiceTemplate.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ServiceTemplate;
