import styled from 'styled-components';

export const Doodle = styled.img`
  width: ${({ theme, size }) => theme.spacing(size)}px;
  height: auto;
`;
