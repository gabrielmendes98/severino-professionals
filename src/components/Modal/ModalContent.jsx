import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

const buttonCancel = label => ({
  variant: 'default',
  id: 'modal-cancel',
  label: label || 'Cancelar',
});

const handleInitialProps = ({
  title: currentTitle = '',
  message: currentMessage = '',
  actions: currentActions = [],
  content: currentContent = '',
  cancelButton: currentCancelButton = true,
  body: currentBody = null,
  raw: currentRaw = false,
  handleClose: currentHandleClose,
  cancelLabel = '',
  ...othersProps
}) => {
  const currentModalData = {
    title: currentTitle,
    message: currentRaw || currentMessage,
    actions: currentCancelButton
      ? [buttonCancel(cancelLabel), ...currentActions]
      : currentActions,
    content: currentContent,
    body: currentBody,
    ...othersProps,
  };

  if (currentHandleClose) {
    currentModalData.handleClose = currentHandleClose;
  }

  return currentModalData;
};

const ModalContent = props => {
  const [modalData, setModalData] = useState(handleInitialProps(props));

  const setConfig = (data = {}) =>
    setModalData(init => ({
      ...init,
      ...data,
    }));

  return (
    <Modal
      open
      setConfig={setConfig}
      closeModal={props.handleClose}
      handleClose={props.handleClose}
      onBackdropClick={props.handleClose}
      setModalData={setModalData}
      {...modalData}
    />
  );
};

ModalContent.propTypes = {
  handleClose: PropTypes.func,
};

export default ModalContent;
