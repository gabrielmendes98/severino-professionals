import { Fragment, useState, useCallback } from 'react';
import { throwError } from 'commons/utils/log';
import Modal from './Modal';

const buttonCancel = label => ({
  variant: 'text',
  color: 'default',
  id: 'modal-cancel',
  label: label || 'Cancelar',
});

const withModal =
  (WrappedComponent, modalProps = {}) =>
  props => {
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState({
      title: '',
      message: '',
      actions: [],
    });

    const handleClose = useCallback(() => {
      setOpen(false);
      return modalData.customHandleClose && modalData.customHandleClose();
    }, [modalData]);

    const handleShow = useCallback(
      ({
        title = '',
        message = '',
        actions = [],
        cancelButton = true,
        body = null,
        handleClose,
        cancelLabel = '',
        ...othersProps
      }) => {
        const currentModalData = {
          title,
          message,
          actions: cancelButton
            ? [buttonCancel(cancelLabel), ...actions]
            : actions,
          body,
          ...othersProps,
        };

        if (handleClose) {
          currentModalData.customHandleClose = handleClose;
        }

        setModalData(currentModalData);
        setOpen(true);
      },
      [],
    );

    const { title, message, actions, body, ...other } = modalData;

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
      <Fragment>
        <WrappedComponent
          {...props}
          showModal={handleShow}
          closeModal={handleClose}
          modalOpened={open}
          setConfig={setConfig}
        />

        {open && (
          <Modal
            open={open}
            body={body}
            title={title}
            message={message}
            actions={actions}
            handleClose={handleClose}
            onClose={handleClose}
            setModalData={setModalData}
            {...other}
            {...modalProps}
          />
        )}
      </Fragment>
    );
  };

export default withModal;
