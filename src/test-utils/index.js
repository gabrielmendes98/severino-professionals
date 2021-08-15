/* eslint-disable react/prop-types */
import { render, configure, screen } from '@testing-library/react';
import MainProvider from 'commons/providers/MainProvider';

configure({ testIdAttribute: 'id' });

const Wrapper = ({ children }) => <MainProvider>{children}</MainProvider>;

const customRender = (ui, options) =>
  render(ui, { wrapper: Wrapper, ...options });

const asFragment = ui => {
  const { asFragment } = customRender(ui);
  return asFragment(ui);
};

const toMatchSnapshot = Component => {
  const wrapper = asFragment(Component);
  expect(wrapper).toMatchSnapshot();
};

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render, screen, toMatchSnapshot, asFragment };
