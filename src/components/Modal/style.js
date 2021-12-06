import styled from 'styled-components';
import DialogActions from '@material-ui/core/DialogActions';

const Actions = styled(DialogActions)`
  margin-bottom: ${({ theme }) => theme.spacing()}px;
`;

export { Actions };
