import styled from 'styled-components';
import { AppBar as MUIAppBar } from '@material-ui/core';

export const AppBar = styled(MUIAppBar)`
  background-color: ${({ theme }) => theme.palette.common.white};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.lighter};
  box-shadow: 0px 1px ${({ theme }) => theme.spacing(0.5)}px rgba(0, 0, 0, 0.25);
`;

export const Divider = styled.div`
  flex-grow: 1;
`;
