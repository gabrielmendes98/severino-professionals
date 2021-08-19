import styled from 'styled-components';
import AppBrand from 'components/AppBrand';

export const FooterContainer = styled.footer`
  display: flex;
  background-color: ${({ theme }) => theme.palette.common.white};
  border-top: 1px solid ${({ theme }) => theme.palette.grey.lighter};
  box-shadow: 0px 1px ${({ theme }) => theme.spacing(0.5)}px rgba(0, 0, 0, 0.25);

  padding-top: ${({ theme }) => theme.spacing(5)}px;
  padding-bottom: ${({ theme }) => theme.spacing(5)}px;
`;

export const StyledAppBrand = styled(AppBrand)`
  text-align: center;
`;
