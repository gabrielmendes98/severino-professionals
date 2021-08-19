import styled from 'styled-components';

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex-grow: 1;
  margin-top: ${({ theme }) => theme.spacing(10)}px;
`;
