import PropTypes from 'prop-types';
import Text from 'components/Text';

const AcademicGraduationTemplate = ({ item }) => (
  <>
    <Text weight="bold">{item.institution}</Text>
    <Text>{item.degree.description}</Text>
    {item.studyArea && <Text>{item.studyArea}</Text>}
  </>
);

AcademicGraduationTemplate.propTypes = {
  item: PropTypes.object.isRequired,
};

export default AcademicGraduationTemplate;
