import React, { useEffect } from "react";

import { useGlobalContext } from "../Context";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
export const loader = ({ params }) => {
  const { id } = params;
  return { id };
};

const InfoBar = ({ backgroundColor, color, status }) => {
  const {
    editInvoice,
    markAsPaid,
    singleInvoice,
    setShowModal,
    deleted,
    invoiceData,
  } = useGlobalContext();
  const { id } = useLoaderData();
  const loadedInvoice = invoiceData.find((invoice) => invoice.id === id);

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
          <Link className="router-link" to={`/editInvoice/${loadedInvoice.id}`}>
            <button
              // onClick={() => editInvoice(loadedInvoice.id)}
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
            onClick={() => markAsPaid(loadedInvoice.id)}
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
