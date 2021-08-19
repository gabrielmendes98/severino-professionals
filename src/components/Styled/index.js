import styled from 'styled-components';
import MuiGrid from '@material-ui/core/Grid';
import { notForward } from 'commons/styles/config';
import { marginHandler, paddingHandler } from 'commons/styles/margin';

export const Grid = styled(MuiGrid).withConfig(notForward('margin', 'padding'))`
  ${style => style.margin && marginHandler(style)}
  ${style => style.padding && paddingHandler(style)}
`;
