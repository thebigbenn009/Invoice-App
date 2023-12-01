import React from "react";

import { useGlobalContext } from "../Context";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";
const InfoBar = ({ backgroundColor, color, status }) => {
  const { editInvoice, markAsPaid, singleInvoice, setShowModal, deleted } =
    useGlobalContext();

  return (
    <div className="info-bar">
      <div className="status-bar">
        <span>Status</span>
        <div
          className="invoice-status-container single-info-status"
          style={{ backgroundColor: backgroundColor, color: color }}
        >
          <span className="dot" style={{ backgroundColor: color }}></span>
          <span className="invoice-status">{status}</span>
        </div>
      </div>
      <div className="info-buttons">
        <div className="btn-info-container">
          <Link className="router-link" to={`/editInvoice/${singleInvoice.id}`}>
            <button
              onClick={() => editInvoice(singleInvoice.id)}
              className="btn"
              style={{ backgroundColor: "#252945", color: "#fff" }}
            >
              Edit
            </button>
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="btn"
            style={{ backgroundColor: "#ec5757", color: "#fff" }}
          >
            Delete
          </button>
          <button
            onClick={() => markAsPaid(singleInvoice.id)}
            className="btn"
            style={{ backgroundColor: "#7c5dfa", color: "#fff" }}
          >
            Mark as paid
          </button>
        </div>
      </div>
      <DeleteModal />
    </div>
  );
};

export default InfoBar;
