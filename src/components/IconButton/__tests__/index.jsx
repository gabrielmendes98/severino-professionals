import { toMatchSnapshot } from 'test-utils';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import IconButton from '..';

it('should match snapshot', () => {
  toMatchSnapshot(
    <IconButton tooltip="test tooltip">
      <AcUnitIcon />
    </IconButton>,
  );
});

it('should match snapshot with custom color', () => {
  toMatchSnapshot(
    <IconButton tooltip="test tooltip " color="red">
      <AcUnitIcon />
    </IconButton>,
  );
});
