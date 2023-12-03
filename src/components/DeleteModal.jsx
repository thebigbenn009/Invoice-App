import React, { useEffect } from "react";

import { useGlobalContext } from "../Context";
import { useLoaderData, useNavigate } from "react-router-dom";
export const loader = ({ params }) => {
  const { id } = params;
  console.log(id);
  return { id };
};

const DeleteModal = () => {
  const navigate = useNavigate();
  const {
    showModal,
    setShowModal,
    singleInvoice,
    deleteInvoice,
    deleted,
    setDeleted,
    invoiceData,
  } = useGlobalContext();
  const { id } = useLoaderData();

  if (showModal) {
    return (
      <div className="overlay" onClick={() => setShowModal(false)}>
        <div className="modal">
          <h3>Confirm Deletion</h3>
          <p>
            {` Are you sure you want to delete invoice #${singleInvoice.id}? This action cannot be
            undone`}
          </p>
          <div className="modal-btn-container">
            <button className="btn btn-cancel">Cancel</button>
            <button
              onClick={() => deleteInvoice(id)}
              className="btn btn-delete"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default DeleteModal;
