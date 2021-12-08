import { render, unmountComponentAtNode } from 'react-dom';
import MainProvider from 'commons/providers/MainProvider';
import ModalContent from './ModalContent';

const MODAL_ID = 'modal';

export const handleClose = () =>
  unmountComponentAtNode(document.getElementById(MODAL_ID));

const showModal = modalData => {
  const onClose = () => {
    if (modalData.handleClose) {
      modalData.handleClose();
      handleClose();
      return;
    }

    handleClose();
  };

  const element = (
    <MainProvider>
      <ModalContent {...modalData} handleClose={onClose} />
    </MainProvider>
  );

  handleClose();

  render(element, document.getElementById(MODAL_ID));
};

export default showModal;
