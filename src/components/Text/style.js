import styled, { css } from 'styled-components';
import MuiTypography from '@material-ui/core/Typography';
import { notForward } from 'commons/styles/config';
import { marginHandler } from 'commons/styles/margin';

const getColor = (palette, typography, textColor) => {
  if (!textColor) return typography.color.main;

  return typography.color[textColor] || palette.common[textColor] || textColor;
};

export const Typography = styled(MuiTypography).withConfig(notForward('raw'))`
  ${({
    theme: { typography, palette },
    textcolor,
    transform,
    weight,
    size,
  }) => css`
    ${marginHandler}
    color: ${getColor(palette, typography, textcolor)};
    text-transform: ${transform};
    font-weight: ${weight};
    font-size: ${size && `${size}rem`};
    letter-spacing: ${typography.letterSpacing}px;
    font-family: ${typography.fontFamily};
  `}
`;
