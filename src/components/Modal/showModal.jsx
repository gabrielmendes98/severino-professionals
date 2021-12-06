import { render, unmountComponentAtNode } from 'react-dom';
import ThemeProvider from 'commons/providers/ThemeProvider';
import ModalContent from './ModalContent';

const MODAL_ID = 'modal';

const handleClose = () =>
  unmountComponentAtNode(document.getElementById(MODAL_ID));

const showModal = modalData => {
  const element = (
    <ThemeProvider>
      <ModalContent {...modalData} handleClose={handleClose} />
    </ThemeProvider>
  );

  handleClose();

  render(element, document.getElementById(MODAL_ID));
};

export default showModal;
