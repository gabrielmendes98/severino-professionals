import ibgeHandler from './ibge';
import photosHandler from './photos';
import academicGraduationsHandler from './academicGraduations';
import skillsHandler from './skills';
import degreeTypesHandler from './degreeTypes';
import loginHandler from './login';
import workersHandler from './workers';
import experiencesHandler from './experiences';
import jobTypesHandler from './jobTypes';

export const handlers = [
  ...ibgeHandler,
  ...photosHandler,
  ...academicGraduationsHandler,
  ...skillsHandler,
  ...degreeTypesHandler,
  ...loginHandler,
  ...workersHandler,
  ...experiencesHandler,
  ...jobTypesHandler,
];
