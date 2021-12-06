import showModal from '../showModal';

const showDeleteModal = ({ onConfirm }) =>
  showModal({
    title: 'Atenção',
    message: 'Tem certeza que deseja excluir o registro selecionado?',
    cancelButton: true,
    actions: [
      {
        variant: 'contained',
        id: 'modal-confirm',
        label: 'Excluir',
        color: 'error',
        onClick: onConfirm,
      },
    ],
  });

export default showDeleteModal;
