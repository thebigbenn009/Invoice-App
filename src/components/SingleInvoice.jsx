import React from "react";
import { Link } from "react-router-dom";
import InfoBar from "./InfoBar";
import { useGlobalContext } from "../Context";
import InvoiceDetails from "./InvoiceDetails";
const SingleInvoice = () => {
  const { singleInvoice } = useGlobalContext();
  return (
    <section className="single-invoice">
      <Link to="/" className="router-link">
        <span>
          <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.342.886L2.114 5.114l4.228 4.228"
              stroke="#9277FF"
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        </span>
        <span>Go back</span>
      </Link>
      <InfoBar
        status={singleInvoice.status}
        backgroundColor={`${
          singleInvoice.status === "pending"
            ? "rgba(255, 143, 0, 0.1)"
            : singleInvoice.status === "paid"
            ? "rgba(51, 214, 159, 0.1)"
            : singleInvoice.status === "draft"
            ? "rgba(151, 151, 151, 0.1)"
            : ""
        }`}
        color={`${
          singleInvoice.status === "pending"
            ? "#ff8f00"
            : singleInvoice.status === "paid"
            ? "#33d69f"
            : singleInvoice.status === "draft"
            ? "rgb(151, 151, 151)"
            : ""
        }`}
      />
      <InvoiceDetails singleInvoice={singleInvoice} />
    </section>
  );
};

export default SingleInvoice;
