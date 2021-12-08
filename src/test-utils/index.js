/* eslint-disable react/prop-types */
import { render, configure, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Form, Formik } from 'formik';
import MainProvider from 'commons/providers/MainProvider';

configure({ testIdAttribute: 'id' });

const Wrapper = ({ children }) => (
  <>
    <MainProvider>{children}</MainProvider>
    <div id="modal"></div>
  </>
);
const RouteWrapper = ({ children }) => (
  <BrowserRouter>
    <Wrapper>{children}</Wrapper>
  </BrowserRouter>
);
const FormikWrapper = ({ children, initialValues, ...config }) => (
  <Formik initialValues={initialValues} {...config}>
    <Form>{children}</Form>
  </Formik>
);

const customRender = (ui, options) =>
  render(ui, { wrapper: Wrapper, ...options });

const renderWithRouter = (ui, { route = '/', ...options } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: RouteWrapper, ...options });
};

const asFragment = ui => {
  const { asFragment } = customRender(ui);
  return asFragment(ui);
};

const toMatchSnapshot = (Component, { useRouter = false } = {}) => {
  const wrapper = asFragment(
    useRouter ? <BrowserRouter>{Component}</BrowserRouter> : Component,
  );
  expect(wrapper).toMatchSnapshot();
};

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export {
  customRender as render,
  screen,
  toMatchSnapshot,
  asFragment,
  renderWithRouter,
  FormikWrapper,
};
