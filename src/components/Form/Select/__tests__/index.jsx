import {
  render,
  FormikWrapper,
  toMatchSnapshot,
  userEvent,
  screen,
  act,
} from 'test-utils';
import Select from '..';

const cities = [
  { label: 'City 1', value: 1 },
  { label: 'City 2', value: 2 },
];

it('should match snapshot', () => {
  toMatchSnapshot(
    <FormikWrapper initialValues={{ city: '' }}>
      <Select name="city" label="City" options={cities} required />
    </FormikWrapper>,
  );
});

it('should set selected value', async () => {
  render(
    <FormikWrapper initialValues={{ city: '' }}>
      <Select name="city" label="City" options={cities} />
    </FormikWrapper>,
  );

  const select = screen.getByLabelText(/city/i);
  userEvent.click(select);
  await act(async () => {
    userEvent.click(await screen.findByText(cities[0].label));
  });

  expect(select.innerHTML).toBe(cities[0].label);
});

it('should renders empty select with emptyStateMessage', async () => {
  render(
    <FormikWrapper initialValues={{ city: '' }}>
      <Select name="city" label="City" hasEmptyValue />
    </FormikWrapper>,
  );

  const select = screen.getByLabelText(/city/i);
  userEvent.click(select);
  const warnNoOptions = await screen.findByText(/não há opções/i);

  expect(warnNoOptions).toBeInTheDocument();
  expect(warnNoOptions).toHaveAttribute('aria-disabled', 'true');
});

it('should renders empty value', async () => {
  render(
    <FormikWrapper initialValues={{ city: '' }}>
      <Select name="city" label="City" hasEmptyValue options={cities} />
    </FormikWrapper>,
  );

  const select = screen.getByLabelText(/city/i);
  userEvent.click(select);
  const selectOptions = await screen.findAllByRole('option');

  expect(selectOptions).toHaveLength(cities.length + 1);
});

it('should show error', async () => {
  render(
    <FormikWrapper
      initialValues={{ city: '' }}
      validate={() => ({ city: 'Required Field' })}
      onSubmit={() => {}}
    >
      <Select name="city" label="City" options={cities} />
      <button type="submit">submit</button>
    </FormikWrapper>,
  );

  userEvent.click(screen.getByRole('button', { name: /submit/i }));
  expect(await screen.findByText(/required field/i)).toBeInTheDocument();
});
