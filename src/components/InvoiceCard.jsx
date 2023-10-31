import React from "react";
import { Link } from "react-router-dom";

const InvoiceCard = ({
  id,
  paymentDue,
  clientName,
  items,
  status,
  backgroundColor,
  color,
}) => {
  return (
   
      <article className="invoice-card">
        <div className="invoice-text-bold id">
          <span>{id}</span>
        </div>
        <div className="invoice-text-light">Due {paymentDue}</div>
        <div className="invoice-text-light name">{clientName}</div>
        <div className="invoice-text-bold">$ {items[0].price}</div>
        <div
          className="invoice-status-container"
          style={{ backgroundColor: backgroundColor, color: color }}
        >
          <span className="dot" style={{ backgroundColor: color }}></span>
          <span className="invoice-status">{status}</span>
        </div>
        <span className="span-icon">
          <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 1l4 4-4 4"
              stroke="#7C5DFA"
              stroke-width="2"
              fill="none"
              fill-rule="evenodd"
            />
          </svg>
        </span>
      </article>
  
  );
};

export default InvoiceCard;
