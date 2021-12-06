import { forwardRef, memo } from 'react';
import Slide from '@material-ui/core/Slide';

const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

Transition.displayName = 'SlideTransition';

export default memo(Transition);
