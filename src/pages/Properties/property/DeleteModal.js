// DeleteModal.js

import React from "react";
import { Modal, ModalBody, ModalHeader, Button } from "reactstrap";

const DeleteModal = ({ isOpen, toggle, productId, onDelete }) => {
  const handleDelete = () => {
    onDelete(productId);
    toggle(); // Close the modal after deletion
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader className="mt-0" toggle={toggle}>
        Delete Property
      </ModalHeader>
      <ModalBody>
        <div className="text-center">
          <i className="mdi mdi-alert-circle-outline" style={{ fontSize: "9em", color: "orange" }} />
          <h2>Are you sure?</h2>
          <h4>{"You won't be able to revert this!"}</h4>
        </div>
        <div className="text-center mt-3">
          <Button type="button" color="success" size="lg" onClick={handleDelete}>
            Yes, delete it!
          </Button>
          <Button type="button" color="danger" size="lg" onClick={toggle}>
            Cancel
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteModal;
