import { toMatchSnapshot, FormikWrapper } from 'test-utils';
import MonthYearPicker from '../MonthYearPicker';

it('should match snapshot', () => {
  toMatchSnapshot(
    <FormikWrapper initialValues={{ startDate: '' }}>
      <MonthYearPicker name="startDate" label="Data de início" />
    </FormikWrapper>,
  );
});

it('should match snapshot with error', () => {
  toMatchSnapshot(
    <FormikWrapper
      initialValues={{ startDate: '' }}
      initialErrors={{ startDate: 'Error test' }}
      initialTouched={{ startDate: true }}
    >
      <MonthYearPicker name="startDate" label="Data de início" />
    </FormikWrapper>,
  );
});
