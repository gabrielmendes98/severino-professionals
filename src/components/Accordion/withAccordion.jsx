/* eslint-disable react/display-name */
import PropTypes from 'prop-types';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Text from 'components/Text';

const withAccordion = Component => {
  const wrappedAccordion = ({
    name,
    handleChange,
    expanded,
    title,
    ...props
  }) => (
    <Accordion
      expanded={expanded === name}
      onChange={handleChange(name)}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${name}-content`}
        id={`${name}-header`}
      >
        <Text color="secondary">{title}</Text>
      </AccordionSummary>
      <AccordionDetails>
        <Component {...props} />
      </AccordionDetails>
    </Accordion>
  );

  wrappedAccordion.propTypes = {
    name: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    expanded: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
      .isRequired,
    title: PropTypes.string.isRequired,
  };

  return wrappedAccordion;
};

export default withAccordion;
