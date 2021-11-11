import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

const Container = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: ${({ theme }) => theme.spacing(8)}px;
`;

export { Container };
