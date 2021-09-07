import { toMatchSnapshot } from 'test-utils';
import withAccordion from '../withAccordion';

it('should match snapshot when accordion is closed', () => {
  const TestComponent = () => <div>Test</div>;
  const Component = withAccordion(TestComponent);
  toMatchSnapshot(
    <Component
      name="test"
      title="Test Accordion"
      expanded={'test2Expanded'}
      handleChange={() => {}}
    />,
  );
});

it('should match snapshot when accordion is opened', () => {
  const TestComponent = () => <div>Test</div>;
  const Component = withAccordion(TestComponent);
  toMatchSnapshot(
    <Component
      name="test"
      title="Test Accordion"
      expanded={'test'}
      handleChange={() => {}}
    />,
  );
});
