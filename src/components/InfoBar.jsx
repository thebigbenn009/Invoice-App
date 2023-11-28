import React from "react";
import { useGlobalContext } from "../Context";
import { Link } from "react-router-dom";
const InfoBar = ({ backgroundColor, color, status }) => {
  const { editInvoice } = useGlobalContext();
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
          <Link className="router-link" to={"/newInvoice"}>
            <button
              onClick={editInvoice}
              className="btn"
              style={{ backgroundColor: "#252945", color: "#fff" }}
            >
              Edit
            </button>
          </Link>
          <button
            className="btn"
            style={{ backgroundColor: "#ec5757", color: "#fff" }}
          >
            Delete
          </button>
          <button
            className="btn"
            style={{ backgroundColor: "#7c5dfa", color: "#fff" }}
          >
            Mark as paid
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
