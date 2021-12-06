import { memo } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { Actions } from './style';

const Buttons = ({ actions, handleClose }) => (
  <Actions>
    {actions.map(
      ({ onClick, children, label, skipClose, color, ...btnProps }) => (
        <Button
          auto
          key={label}
          color={color}
          margin={{ top: 2, right: 2, bottom: 2 }}
          onClick={() => {
            if (onClick) onClick(handleClose);
            if (!skipClose) handleClose();
          }}
          {...btnProps}
        >
          {label}
        </Button>
      ),
    )}
  </Actions>
);

Buttons.propTypes = {
  actions: PropTypes.array,
  handleClose: PropTypes.func,
};

Buttons.defaultProps = {
  color: 'primary',
};

export default memo(Buttons);
