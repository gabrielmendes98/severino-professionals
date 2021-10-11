import PropTypes from 'prop-types';
import Text from 'components/Text';
import { TextWrapper } from './style';
import {
  formatCompanyJobType,
  formatExperienceLocation,
  formatExperienceTime,
} from './util';

const ExprienceTemplate = ({ item }) => (
  <TextWrapper>
    <Text weight="bold">{item.role}</Text>
    <Text>{formatCompanyJobType(item)}</Text>
    <Text>{formatExperienceTime(item)}</Text>
    <Text>{formatExperienceLocation(item)}</Text>
  </TextWrapper>
);

ExprienceTemplate.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ExprienceTemplate;
