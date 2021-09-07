import { darken } from '@material-ui/core/styles';

export const getColor = (theme, color) =>
  theme.palette.common[color] ||
  theme.palette[color]?.main ||
  theme.palette.primary.main;

export const getContrastColor = (theme, color) =>
  theme.palette.getContrastText(getColor(theme, color));

export const getDarkerColor = (theme, color) =>
  darken(getColor(theme, color), theme.palette.tonalOffset);
