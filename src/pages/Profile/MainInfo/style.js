import styled from 'styled-components';
import MuiAvatar from '@material-ui/core/Avatar';

const Avatar = styled(MuiAvatar)`
  width: ${({ theme }) => theme.spacing(15)}px;
  height: ${({ theme }) => theme.spacing(15)}px;
`;

export { Avatar };
