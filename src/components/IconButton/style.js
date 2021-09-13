import styled, { css } from 'styled-components';
import MuiIconButton from '@material-ui/core/IconButton';
import { marginHandler } from 'commons/styles/margin';
import {
  getContrastColor,
  getColor,
  getDarkerColor,
} from 'commons/styles/util';
import { notForward } from 'commons/styles/config';

export const StyledIconButton = styled(MuiIconButton).withConfig(
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
