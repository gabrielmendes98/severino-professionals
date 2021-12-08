import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import { throwError } from 'commons/utils/log';

const buttonCancel = label => ({
  variant: 'text',
  color: 'default',
  id: 'modal-cancel',
  label: label || 'Cancelar',
});

const handleInitialProps = ({
  title = '',
  message = '',
  actions = [],
  cancelButton = true,
  body = null,
  handleClose,
  cancelLabel = '',
  ...othersProps
}) => ({
  title,
  message,
  actions: cancelButton ? [buttonCancel(cancelLabel), ...actions] : actions,
  body,
  handleClose,
  ...othersProps,
});

const ModalContent = props => {
  const [modalData, setModalData] = useState(handleInitialProps(props));

  const setConfig = useCallback(config => {
    if (!config) {
      throwError('Passe ao menos uma configuração para o modal');
    }

    setModalData(init => ({
      ...init,
      ...config,
    }));
  }, []);

  return (
    <Modal
      open
      setConfig={setConfig}
      closeModal={props.handleClose}
      handleClose={props.handleClose}
      onClose={props.handleClose}
      setModalData={setModalData}
      {...modalData}
    />
  );
};

ModalContent.propTypes = {
  handleClose: PropTypes.func,
};

export default ModalContent;
