import { render, unmountComponentAtNode } from 'react-dom';
import MainProvider from 'commons/providers/MainProvider';
import ModalContent from './ModalContent';

const MODAL_ID = 'modal';

const handleClose = () =>
  unmountComponentAtNode(document.getElementById(MODAL_ID));

const showModal = modalData => {
  const element = (
    <MainProvider>
      <ModalContent {...modalData} handleClose={handleClose} />
    </MainProvider>
  );

  handleClose();

  render(element, document.getElementById(MODAL_ID));
};

export default showModal;
