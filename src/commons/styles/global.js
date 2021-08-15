import { createGlobalStyle } from 'styled-components';

const globalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    ::-webkit-scrollbar-track {
      background-color: #FAFAFA;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #8C8C8C;
      opacity: 0.7;
    }
    ::-webkit-input-placeholder {
      color: rgba(0, 0, 0, 0.3);
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
      background-clip: content-box !important;
      box-shadow: 0 0 0px 1000px #ffffff inset !important;
      -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
    }
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    /* Firefox */
    input[type='number'] {
      -moz-appearance: textfield;
    }
  }
  html {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-weight: normal;
  }
  a, a:visited {
    text-decoration: unset;
    color: inherit;
  }
  html,
  body,
  #root {
      width: 100%;
      height: 100%;
      display: flex;
      letter-spacing: ${({ theme }) => theme.typography.letterSpacing}px;
      .toast-error {
          background: ${({ theme }) => theme.palette.error.main};
      }
      .toast-warn {
          background: ${({ theme }) => theme.palette.common.yellow};
          color: ${({ theme }) => theme.palette.primary.main};
          & > button {
          color: ${({ theme }) => theme.palette.primary.main};
          }
      }
      .toast-success {
          background: ${({ theme }) => theme.palette.secondary.main};
      }
      .react-datepicker-popper {
          z-index: ${({ theme }) => theme.zIndex.snackbar};
      }
      .select-dropdown {
          max-height: 20vh !important;
      }
      .MuiButton-root {
        text-transform: none;
      }
  }
  h1,h2,h3,h4,h5,h6 {
    font-family: ${({ theme }) => theme.typography.titleFontFamily}
  }
`;

export default globalStyle;
