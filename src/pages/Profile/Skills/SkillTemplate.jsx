import PropTypes from 'prop-types';
import Text from 'components/Text';

const SkillTemplate = ({ item }) => <Text>{item.name}</Text>;

SkillTemplate.propTypes = {
  item: PropTypes.object.isRequired,
};

export default SkillTemplate;
