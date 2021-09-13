import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Text from 'components/Text';
import IconButton from 'components/IconButton';
import { Wrapper, TextWrapper } from './style';
import {
  formatCompanyJobType,
  formatExperienceTime,
  formatExperienceLocation,
} from './util';

const ExperiencesList = ({ experiences, deleteExperience, editExperience }) => (
  <Paper component={Wrapper}>
    <List component={Wrapper}>
      {experiences?.map((experience, index) => (
        <ListItem
          key={experience.id}
          divider={index !== experiences.length - 1}
        >
          <TextWrapper>
            <Text weight="bold">{experience.role}</Text>
            <Text>{formatCompanyJobType(experience)}</Text>
            <Text>{formatExperienceTime(experience)}</Text>
            <Text>{formatExperienceLocation(experience)}</Text>
          </TextWrapper>

          <ListItemSecondaryAction>
            <IconButton
              color="primary"
              tooltip="Editar"
              onClick={() => editExperience(experience)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              tooltip="Deletar"
              onClick={() => deleteExperience(experience.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  </Paper>
);

ExperiencesList.propTypes = {
  experiences: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
  editExperience: PropTypes.func.isRequired,
};

export default ExperiencesList;
