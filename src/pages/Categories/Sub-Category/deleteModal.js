import React from "react";
import { Modal, ModalBody, ModalHeader, Button } from "reactstrap";

const DeleteModal = ({ isOpen, toggle, subcategoryId, onDelete }) => {
  const handleDelete = () => {
    onDelete(subcategoryId);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader className="mt-0" toggle={toggle}>
        Delete Sub-Category
      </ModalHeader>
      <ModalBody>
        <div className="text-center">
          <i className="mdi mdi-alert-circle-outline" style={{ fontSize: "9em", color: "orange" }} />
          <h2>Are you sure?</h2>
          <h4>{"You won't be able to revert this!"}</h4>
        </div>
        <div className="text-center mt-3">
          <Button type="button" color="success" className="mx-2" size="lg" onClick={handleDelete}>
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