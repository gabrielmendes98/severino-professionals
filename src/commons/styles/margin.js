import { css } from 'styled-components';

const marginHandler = ({
  theme,
  margin: { left = 0, right = 0, top = 0, bottom = 0 } = {},
}) => css`
  margin-top: ${theme.spacing(top)}px;
  margin-left: ${theme.spacing(left)}px;
  margin-right: ${theme.spacing(right)}px;
  margin-bottom: ${theme.spacing(bottom)}px;
`;

const paddingHandler = ({
  theme,
  padding: { left = 0, right = 0, top = 0, bottom = 0 } = {},
}) => css`
  padding-top: ${theme.spacing(top)}px;
  padding-left: ${theme.spacing(left)}px;
  padding-right: ${theme.spacing(right)}px;
  padding-bottom: ${theme.spacing(bottom)}px;
`;

export { marginHandler, paddingHandler };
