import {
  toMatchSnapshot,
  render,
  screen,
  userEvent,
  FormikWrapper,
} from 'test-utils';
import Input from '..';

it('should match snapshot with normal input', () => {
  toMatchSnapshot(
    <FormikWrapper>
      <Input name="test" label="Test" />
    </FormikWrapper>,
  );
});

it('should match snapshot with normal input with error', () => {
  toMatchSnapshot(
    <FormikWrapper>
      <Input error helperText="Error helper text" name="test" label="Test" />
    </FormikWrapper>,
  );
});

it('should match snapshot with masked input', () => {
  toMatchSnapshot(
    <FormikWrapper>
      <Input name="test" label="Test" mask="cpf" />
    </FormikWrapper>,
  );
});

it('should add mask to input on typing', () => {
  render(
    <FormikWrapper initialValues={{ test: '' }}>
      <Input name="test" label="Test" mask="cpf" />
    </FormikWrapper>,
  );
  const input = screen.getByLabelText(/test/i);
  userEvent.type(input, '12345678900');
  expect(input).toHaveValue('123.456.789-00');
});
