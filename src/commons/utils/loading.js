import { render } from 'react-dom';
import Loading from 'components/Loading';

let loadingCount = 0;
let loadingContainer = null;

const show = () => {
  loadingCount += 1;

  if (!loadingContainer) {
    loadingContainer = document.createElement('div');
    loadingContainer.id = 'loading';
    document.body.append(loadingContainer);
    render(<Loading fullScreen />, loadingContainer);
  }
};

const hide = () => {
  loadingCount -= 1;
  if (!loadingCount) {
    document.body.removeChild(loadingContainer);
    loadingContainer = null;
  }
};

export default {
  show,
  hide,
};
