import { useEffect } from 'react';
import { render, screen, userEvent } from 'test-utils';
import * as log from 'commons/utils/log';
import showModal, { handleClose } from '../showModal';

afterEach(handleClose);

it('should show modal with title, message and cancel button', async () => {
  render(<div></div>);

  const modalData = {
    title: 'Test modal',
    message: 'Test message',
  };

  showModal(modalData);

  expect(await screen.findByTestId('modal-cancel')).toBeInTheDocument();
  expect(screen.getByText(modalData.title)).toBeInTheDocument();
  expect(screen.getByText(modalData.message)).toBeInTheDocument();
});

it('should show modal with title, message and hidden button', async () => {
  render(<div></div>);

  const modalData = {
    title: 'Test modal',
    message: 'Test message',
    cancelButton: false,
  };

  showModal(modalData);

  expect(await screen.findByText(modalData.title)).toBeInTheDocument();
  expect(screen.getByText(modalData.message)).toBeInTheDocument();
  expect(screen.queryByTestId('modal-cancel')).not.toBeInTheDocument();
});

it('should be able to change cancel button label', async () => {
  render(<div></div>);

  const modalData = {
    cancelLabel: 'Test cancel button',
  };

  showModal(modalData);

  expect(await screen.findByText(modalData.cancelLabel)).toBeInTheDocument();
});

it('should use default void title and message and do not render title and message', async () => {
  render(<div></div>);

  const modalData = {};

  showModal(modalData);

  expect(await screen.findByTestId('modal-cancel')).toBeInTheDocument();
  expect(screen.queryByTestId('modal-title')).not.toBeInTheDocument();
  expect(screen.queryByTestId('modal-message')).not.toBeInTheDocument();
});

it('should render action buttons', async () => {
  render(<div></div>);

  const modalOkConfig = {
    color: 'default',
    id: 'modal-ok',
    label: 'OK',
  };

  const modalData = {
    actions: [modalOkConfig],
  };

  showModal(modalData);

  const modalOkButton = await screen.findByTestId('modal-ok');

  expect(modalOkButton).toBeInTheDocument();
  expect(modalOkButton).toHaveTextContent(modalOkConfig.label);
});

it('action buttons should call own onClick', async () => {
  render(<div></div>);

  const onClick = jest.fn();

  const modalOkConfig = {
    id: 'modal-ok',
    label: 'OK',
    onClick,
  };

  const modalData = {
    actions: [modalOkConfig],
  };

  showModal(modalData);

  userEvent.click(await screen.findByTestId('modal-ok'));
  expect(onClick).toHaveBeenCalledTimes(1);
});

it('should call custom handleClose if it exists', async () => {
  render(<div></div>);

  const mockHandleClose = jest.fn();

  const modalData = {
    handleClose: mockHandleClose,
  };

  showModal(modalData);

  userEvent.click(await screen.findByTestId('modal-cancel'));

  expect(mockHandleClose).toHaveBeenCalledTimes(1);
});

it('action buttons should call own onClick', async () => {
  render(<div></div>);

  const onClick = jest.fn();
  const mockHandleClose = jest.fn();

  const modalOkConfig = {
    id: 'modal-ok',
    label: 'OK',
    skipClose: true,
    onClick,
  };

  const modalData = {
    actions: [modalOkConfig],
    handleClose: mockHandleClose,
  };

  showModal(modalData);

  userEvent.click(await screen.findByTestId('modal-ok'));
  expect(onClick).toHaveBeenCalledTimes(1);
  expect(mockHandleClose).not.toHaveBeenCalled();
});

it('should be able to show modal with body and body receive props', async () => {
  render(<div></div>);

  const modalBodyText = 'modal body text';

  // eslint-disable-next-line react/prop-types
  const Body = ({ text }) => (
    <div>
      <p>{text}</p>
    </div>
  );

  showModal({
    body: Body,
    text: modalBodyText,
  });

  expect(await screen.findByText(modalBodyText)).toBeInTheDocument();
});

it('should be able to set config after render modal', async () => {
  render(<div></div>);

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

  showModal({
    body: Body,
    text: modalBodyText,
  });

  expect(await screen.findByText(modalBodyText)).toBeInTheDocument();
  expect(screen.getByTestId(modalOkConfig.id)).toBeInTheDocument();
});

it('should throw error when do not pass config to setConfig', async () => {
  const throwError = jest.spyOn(log, 'throwError').mockImplementation(jest.fn);

  render(<div></div>);

  // eslint-disable-next-line react/prop-types
  const Body = ({ setConfig }) => {
    useEffect(() => {
      setConfig();
    }, [setConfig]);

    return <div></div>;
  };

  showModal({
    body: Body,
  });

  expect(throwError).toHaveBeenCalledTimes(1);
  expect(throwError).toHaveBeenCalledWith(
    'Passe ao menos uma configuração para o modal',
  );
});
