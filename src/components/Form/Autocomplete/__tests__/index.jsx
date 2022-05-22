import {
  FormikWrapper,
  render,
  userEvent,
  screen,
  waitFor,
  within,
  fireEvent,
} from 'test-utils';
import { Form, Formik } from 'formik';
import * as debounce from 'lodash.debounce';
import yup, { validationMessages } from 'commons/utils/yup';
import Autocomplete from '../index';

const options = [
  {
    label: 'option 1',
    value: 1,
  },
  {
    label: 'option 2',
    value: 2,
  },
];
const name = 'autocomplete';
const label = 'Autocomplete';

describe('with debounce', () => {
  it('should debounce onChange event', async () => {
    const onChange = jest.fn();
    const testText = 'test text';
    render(
      <FormikWrapper initialValues={{ [name]: '' }}>
        <Autocomplete
          label={label}
          name={name}
          options={options}
          onChange={onChange}
        />
      </FormikWrapper>,
    );

    userEvent.type(screen.getByLabelText(label), testText);
    expect(onChange).not.toHaveBeenCalled();
    await waitFor(() => expect(onChange).toHaveBeenCalledWith(testText), {
      timeout: 600,
    });
  });
});

describe('without debounce', () => {
  jest.spyOn(debounce, 'default').mockImplementation(fn => fn);

  it('should show options when type', async () => {
    const onChange = jest.fn();
    const testText = 'option';
    render(
      <FormikWrapper initialValues={{ [name]: '' }}>
        <Autocomplete
          label={label}
          name={name}
          options={options}
          onChange={onChange}
        />
      </FormikWrapper>,
    );

    userEvent.type(screen.getByLabelText(label), testText);
    const listbox = await screen.findByRole('listbox');
    expect(within(listbox).getByText(options[0].label)).toBeTruthy();
  });

  it('should hide options when input void value', async () => {
    const onChange = jest.fn();
    render(
      <FormikWrapper initialValues={{ [name]: '' }}>
        <Autocomplete
          label={label}
          name={name}
          options={options}
          onChange={onChange}
        />
      </FormikWrapper>,
    );

    userEvent.clear(screen.getByLabelText(label));
    expect(screen.queryByText(options[0].label)).toBeFalsy();
  });

  it('should not set input value when dont click on option', async () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const testText = 'test text';
    render(
      <FormikWrapper initialValues={{ [name]: '' }} onSubmit={onSubmit}>
        <Autocomplete
          label={label}
          name={name}
          options={options}
          onChange={onChange}
        />
        <button type="submit">submit</button>
      </FormikWrapper>,
    );

    userEvent.type(screen.getByLabelText(label), testText);
    userEvent.click(screen.getByRole('button', { name: 'submit' }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        {
          [name]: '',
        },
        expect.anything(),
      );
    });
  });

  it('should set input value when click on option', async () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const testText = 'option';
    render(
      <FormikWrapper initialValues={{ [name]: '' }} onSubmit={onSubmit}>
        <Autocomplete
          label={label}
          name={name}
          options={options}
          onChange={onChange}
        />
        <button type="submit">submit</button>
      </FormikWrapper>,
    );

    userEvent.type(screen.getByLabelText(label), testText);
    userEvent.click(await screen.findByText(options[0].label));
    userEvent.click(screen.getByRole('button', { name: 'submit' }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        {
          [name]: options[0].value,
        },
        expect.anything(),
      );
    });
  });

  it('should show validation errors', async () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    render(
      <FormikWrapper
        initialValues={{ [name]: '' }}
        onSubmit={onSubmit}
        validationSchema={yup.object().shape({
          [name]: yup.string().trim().required(),
        })}
      >
        <Autocomplete
          label={label}
          name={name}
          options={options}
          onChange={onChange}
        />
        <button type="submit">submit</button>
      </FormikWrapper>,
    );

    userEvent.click(screen.getByRole('button', { name: 'submit' }));
    expect(await screen.findByText(validationMessages.mixed.required));
  });

  it('should back to last value and close options on blur', async () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const testText = 'option';
    render(
      <FormikWrapper initialValues={{ [name]: '' }} onSubmit={onSubmit}>
        <Autocomplete
          label={label}
          name={name}
          options={options}
          onChange={onChange}
        />
        <button type="submit">submit</button>
      </FormikWrapper>,
    );

    const input = screen.getByLabelText(label);
    userEvent.type(input, testText);
    userEvent.click(await screen.findByText(options[0].label));

    userEvent.type(input, 'keke');
    expect(input).toHaveValue(`${options[0].label}keke`);
    fireEvent.blur(input);
    expect(input).toHaveValue(options[0].label);
    await waitFor(() => {});
  });

  it('should clear input on form reset', async () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const testText = 'option';
    render(
      <Formik initialValues={{ [name]: '' }} onSubmit={onSubmit}>
        {({ resetForm }) => (
          <Form>
            <Autocomplete
              label={label}
              name={name}
              options={options}
              onChange={onChange}
            />
            <button type="button" onClick={resetForm}>
              reset form
            </button>
          </Form>
        )}
      </Formik>,
    );

    const input = screen.getByLabelText(label);
    userEvent.type(input, testText);
    userEvent.click(await screen.findByText(options[0].label));
    userEvent.click(screen.getByRole('button', { name: 'reset form' }));
    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });
});
