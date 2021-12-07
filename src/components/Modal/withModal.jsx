import { Fragment, useState, useCallback } from 'react';
import Modal from './Modal';

const buttonCancel = label => ({
  variant: 'default',
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
      return modalData.handleClose && modalData.handleClose();
    }, [modalData]);

    const handleShow = useCallback(
      ({
        title: currentTitle = '',
        message: currentMessage = '',
        actions: currentActions = [],
        content: currentContent = '',
        cancelButton: currentCancelButton = true,
        body: currentBody = null,
        handleClose: currentHandleClose,
        cancelLabel = '',
        ...othersProps
      }) => {
        const currentModalData = {
          title: currentTitle,
          message: currentMessage,
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

        setModalData(currentModalData);
        setOpen(true);
      },
      [],
    );

    const { title, message, actions, content, body, ...other } = modalData;

    const setConfig = (data = {}) =>
      setModalData(init => ({
        ...init,
        ...data,
      }));

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
            content={content}
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
