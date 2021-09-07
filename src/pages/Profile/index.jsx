import { useState } from 'react';
import Container from '@material-ui/core/Container';
import MainInfo from './MainInfo';
import Experiences from './Experiences';

const Profile = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="lg">
      <MainInfo
        name="main"
        title="Informações principais"
        expanded={expanded}
        handleChange={handleChange}
      />

      <Experiences
        name="experiences"
        title="Experiências profissionais"
        expanded={expanded}
        handleChange={handleChange}
      />
    </Container>
  );
};

export default Profile;
