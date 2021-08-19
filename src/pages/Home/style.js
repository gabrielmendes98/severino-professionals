import styled from 'styled-components';
import Button from 'components/Button';

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.main};
  width: 100%;
  padding: ${({ theme }) => theme.spacing(5)}px 0;
`;

export const WhiteButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.common.white};
  font-weight: bold;

  * {
    color: ${({ theme }) => theme.palette.secondary.main};
  }
`;
