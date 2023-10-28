import React from "react";

const InvoiceCard = ({ id, paymentDue, clientName, price, name }) => {
  return (
    <article className="invoice-card">
      <p className="invoice-text-bold">#RT3080</p>
      <p className="invoice-text-light">Due 19 August 2023</p>
      <p className="invoice-text-light name">Jensen Huang </p>
      <p className="invoice-text-bold">£ 1,800.90</p>
      <div className="invoice-status-container">
        <span className="dot"></span>
        <span className="invoice-status">paid</span>
      </div>
      <span>
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
