import { useEffect } from 'react';
import { screen, render, userEvent } from 'test-utils';
import * as log from 'commons/utils/log';
import withModal from '../withModal';

it('should add modal to DOM and pass modal props to component with default config', async () => {
  // eslint-disable-next-line react/prop-types
  const Component = ({ showModal }) => (
    <div>
      <button onClick={() => showModal({})}>open modal</button>
    </div>
  );

  const ModalComponent = withModal(Component);

  render(<ModalComponent />);
  userEvent.click(screen.getByRole('button', { name: /open modal/i }));
  expect(await screen.findByTestId('modal-cancel')).toBeInTheDocument();
});

it('should be able to modify modal config', async () => {
  const modalBodyText = 'Modal Body';
  const ModalBody = () => <div>{modalBodyText}</div>;

  const modalConfig = {
    title: 'Modal Title',
    message: 'Modal Message',
    actions: [
      {
        color: 'default',
        id: 'modal-ok',
        label: 'OK',
      },
    ],
    cancelButton: false,
    body: ModalBody,
  };

  // eslint-disable-next-line react/prop-types
  const Component = ({ showModal }) => (
    <div>
      <button onClick={() => showModal(modalConfig)}>open modal</button>
    </div>
  );

  const ModalComponent = withModal(Component);

  render(<ModalComponent />);
  userEvent.click(screen.getByRole('button', { name: /open modal/i }));
  expect(await screen.findByTestId('modal-ok')).toBeInTheDocument();
  expect(screen.queryByTestId('modal-cancel')).not.toBeInTheDocument();
  expect(screen.getByText(modalConfig.title)).toBeInTheDocument();
  expect(screen.getByText(modalConfig.message)).toBeInTheDocument();
  expect(screen.getByText(modalBodyText)).toBeInTheDocument();
});

it('should be able to change cancel label', async () => {
  const cancelLabel = 'Cancel Test';
  // eslint-disable-next-line react/prop-types
  const Component = ({ showModal }) => (
    <div>
      <button
        onClick={() =>
          showModal({
            cancelLabel,
          })
        }
      >
        open modal
      </button>
    </div>
  );

  const ModalComponent = withModal(Component);

  render(<ModalComponent />);

  userEvent.click(screen.getByRole('button', { name: /open modal/i }));

  const cancelButton = await screen.findByTestId('modal-cancel');
  expect(cancelButton).toBeInTheDocument();
  expect(cancelButton).toHaveTextContent(cancelLabel);
});

it('should be able to use custom handleClose', async () => {
  const handleClose = jest.fn();
  // eslint-disable-next-line react/prop-types
  const Component = ({ showModal }) => (
    <div>
      <button
        onClick={() =>
          showModal({
            handleClose,
          })
        }
      >
        open modal
      </button>
    </div>
  );

  const ModalComponent = withModal(Component);

  render(<ModalComponent />);
  userEvent.click(screen.getByRole('button', { name: /open modal/i }));
  userEvent.click(await screen.findByTestId('modal-cancel'));

  expect(handleClose).toHaveBeenCalledTimes(1);
});

it('default handleClose should close modal', async () => {
  // eslint-disable-next-line react/prop-types
  const Component = ({ showModal }) => (
    <div>
      <button onClick={() => showModal({})}>open modal</button>
    </div>
  );

  const ModalComponent = withModal(Component);

  render(<ModalComponent />);
  userEvent.click(screen.getByRole('button', { name: /open modal/i }));
  userEvent.click(await screen.findByTestId('modal-cancel'));

  expect(screen.queryByTestId('modal-cancel')).not.toBeInTheDocument();
});

it('should be able to set config after render modal', async () => {
  const modalBodyText = 'modal body text';
  const modalOkConfig = {
    id: 'modal-ok',
    label: 'OK',
  };

  // eslint-disable-next-line react/prop-types
  const Body = ({ text, setConfig }) => {
    useEffect(() => {
      setConfig({
        actions: [modalOkConfig],
      });
    }, [setConfig]);

    return (
      <div>
        <p>{text}</p>
      </div>
    );
  };

  // eslint-disable-next-line react/prop-types
  const Component = ({ showModal, setConfig }) => (
    <div>
      <button
        onClick={() =>
          showModal({
            body: Body,
            text: modalBodyText,
            setConfig,
          })
        }
      >
        open modal
      </button>
    </div>
  );

  const ModalComponent = withModal(Component);

  render(<ModalComponent />);
  userEvent.click(screen.getByRole('button', { name: /open modal/i }));
  expect(await screen.findByTestId(modalOkConfig.id)).toBeInTheDocument();
  expect(screen.getByText(modalBodyText)).toBeInTheDocument();
});

it('should be able to set config after render modal', async () => {
  const throwError = jest.spyOn(log, 'throwError').mockImplementation(jest.fn);

  // eslint-disable-next-line react/prop-types
  const Body = ({ text, setConfig }) => {
    useEffect(() => {
      setConfig();
    }, [setConfig]);

    return (
      <div>
        <p>{text}</p>
      </div>
    );
  };

  // eslint-disable-next-line react/prop-types
  const Component = ({ showModal, setConfig }) => (
    <div>
      <button
        onClick={() =>
          showModal({
            body: Body,
            setConfig,
          })
        }
      >
        open modal
      </button>
    </div>
  );

  const ModalComponent = withModal(Component);

  render(<ModalComponent />);
  userEvent.click(screen.getByRole('button', { name: /open modal/i }));
  expect(throwError).toHaveBeenCalledTimes(1);
  expect(throwError).toHaveBeenCalledWith(
    'Passe ao menos uma configuração para o modal',
  );
});
