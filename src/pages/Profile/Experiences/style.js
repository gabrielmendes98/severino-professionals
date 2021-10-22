import styled from 'styled-components';

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BreakLine = styled.div`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    display: none;
  }
`;
