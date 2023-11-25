import React from "react";

const InfoBar = ({ backgroundColor, color, status }) => {
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
          <button
            className="btn"
            style={{ backgroundColor: "#252945", color: "#fff" }}
          >
            Edit
          </button>
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
