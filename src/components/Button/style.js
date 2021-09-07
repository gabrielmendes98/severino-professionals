import styled, { css } from 'styled-components';
import MuiButton from '@material-ui/core/Button';
import { marginHandler } from 'commons/styles/margin';
import {
  getContrastColor,
  getColor,
  getDarkerColor,
} from 'commons/styles/util';
import { notForward } from 'commons/styles/config';

export const StyledButton = styled(MuiButton).withConfig(
  notForward('customColor'),
)`
  ${marginHandler};

  ${({ customColor }) =>
    customColor &&
    css`
      background-color: ${({ theme, customColor }) =>
        getColor(theme, customColor)};

      color: ${({ theme, customColor }) =>
        getContrastColor(theme, customColor)};

      &:hover {
        background-color: ${({ theme, customColor }) =>
          getDarkerColor(theme, customColor)};
    `}
`;
