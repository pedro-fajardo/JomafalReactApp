import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ showDeleteModal, handleCloseDeleteModal, handleDelete }) => {
  return (
    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmação de apagar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          Tem a certeza que deseja apagar este equipamento? Após confirmar não poderá reverter esta operação.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseDeleteModal}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Apagar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;