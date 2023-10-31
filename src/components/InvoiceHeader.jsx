import React from "react";
import { Link } from "react-router-dom";

const InvoiceHeader = () => {
  return (
    <header>
      <div className="invoice-info-1">
        <h2 className="invoice">invoices</h2>
        <p className="total-invoice">
          <span className="total">there are 7 total</span>
          <span className="num">7</span> invoices
        </p>
      </div>
      <div className="invoice-info-2">
        <div className="filter">
          <select className="select" name="filter" id="filter">
            <option value="">
              Filter<span className="filter-by">by status</span>
            </option>
            <option value="Pending">pending</option>
            <option value="Draft">draft</option>
            <option value="Paid">paid</option>
          </select>
        </div>
        <Link to="/newInvoice">
          <button className="invoice-btn" type="button">
            <span className="btn-svg">
              <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
                  fill="#7C5DFA"
                  fill-rule="nonzero"
                />
              </svg>
            </span>
            <span className="hide-new">new</span>invoice
          </button>
        </Link>
      </div>
    </header>
  );
};

export default InvoiceHeader;
