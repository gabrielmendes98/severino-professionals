import styled from 'styled-components';

import MuiPaper from '@material-ui/core/Paper';
import { Grid } from 'components/Styled';

export const StyledGrid = styled(Grid)`
  ${props => props.theme.breakpoints.down('sm')} {
    justify-content: center;
    padding-right: 0;
    padding-bottom: ${({ theme }) => theme.spacing(5)}px;
  }
`;

export const Paper = styled(MuiPaper)`
  max-width: ${({ theme }) => theme.spacing(75)}px;
`;
