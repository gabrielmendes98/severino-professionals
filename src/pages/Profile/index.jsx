import { useState } from 'react';
import Container from '@material-ui/core/Container';
import MainInfo from './MainInfo';
import Experiences from './Experiences';
import Photos from './Photos';
import AcademicGraduation from './AcademicGraduations';
import Skills from './Skills';
import Services from './Services';

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

      <Services
        name="services"
        title="Serviços que presto"
        expanded={expanded}
        handleChange={handleChange}
      />

      <Experiences
        name="experiences"
        title="Experiências profissionais"
        expanded={expanded}
        handleChange={handleChange}
      />

      <Photos
        name="photos"
        title="Fotos dos meus trabalhos"
        expanded={expanded}
        handleChange={handleChange}
      />

      <AcademicGraduation
        name="academicGraduation"
        title="Formação Acadêmica"
        expanded={expanded}
        handleChange={handleChange}
      />

      <Skills
        name="skills"
        title="Habilidades"
        expanded={expanded}
        handleChange={handleChange}
      />
    </Container>
  );
};

export default Profile;
