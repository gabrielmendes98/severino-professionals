import {
  FormikWrapper,
  toMatchSnapshot,
  render,
  screen,
  userEvent,
  fireEvent,
  waitFor,
} from 'test-utils';
import Checkbox from '..';

it('should render checkbox without errors', () => {
  toMatchSnapshot(
    <FormikWrapper initialValues={{ name: false }}>
      <Checkbox name="test" label="Test" />
    </FormikWrapper>,
  );
});

it('should render checkbox with errors', async () => {
  render(
    <FormikWrapper
      initialValues={{ test: false }}
      validate={() => ({ test: 'Required Field' })}
      onSubmit={() => {}}
    >
      <Checkbox name="test" label="Test" />
      <button type="submit">submit</button>
    </FormikWrapper>,
  );

  userEvent.click(screen.getByRole('button', { name: /submit/i }));
  expect(await screen.findByText(/required field/i)).toBeInTheDocument();
});

it('should set value when click on checkbox', () => {
  render(
    <FormikWrapper initialValues={{ test: false }}>
      <Checkbox name="test" label="Test" />
    </FormikWrapper>,
  );

  const checkBox = screen.getByLabelText(/test/i);
  expect(checkBox).not.toBeChecked();
  userEvent.click(checkBox);
  expect(checkBox).toBeChecked();
});
