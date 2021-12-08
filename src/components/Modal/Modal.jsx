import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Buttons from './Buttons';
import Transition from './Transition';

const getButtons = handleClose => {
  const ActionButtons = actions => (
    <Buttons actions={actions} handleClose={handleClose} />
  );

  ActionButtons.displayName = 'ActionButtons';

  return ActionButtons;
};

const Modal = ({
  open,
  title,
  message,
  actions,
  body: Body,
  handleClose,
  onClose,
  setModalData,
  fullWidth,
  maxWidth,
  ...other
}) => {
  const renderButtons = getButtons(handleClose);
  const bodyContent = Body ? (
    <Body
      close={handleClose}
      handleClose={handleClose}
      setModalData={setModalData}
      renderButtons={renderButtons}
      {...other}
    />
  ) : null;

  return (
    <Dialog
      open={open}
      keepMounted
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      {title && <DialogTitle id="modal-title">{title}</DialogTitle>}
      <DialogContent>
        {message && (
          <DialogContentText id="modal-message">{message}</DialogContentText>
        )}
        {bodyContent}
      </DialogContent>
      {actions && actions.length ? renderButtons(actions) : null}
    </Dialog>
  );
};

Modal.propTypes = {
  open: PropTypes.bool,
  body: PropTypes.any,
  title: PropTypes.any,
  message: PropTypes.any,
  actions: PropTypes.array,
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  handleClose: PropTypes.func,
  setModalData: PropTypes.func,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  open: false,
  maxWidth: 'sm',
};

export default Modal;
