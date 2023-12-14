import React from "react";
import { Link } from "react-router-dom";
import InfoBar from "./InfoBar";
import { useGlobalContext } from "../Context";
import InvoiceDetails from "./InvoiceDetails";
import { useEffect } from "react";
import DeleteModal from "./DeleteModal";
import { useLoaderData, useNavigate } from "react-router-dom";
export const loader = ({ params }) => {
  const { id } = params;
  console.log(id);
  return { id };
};
const SingleInvoice = () => {
  const navigate = useNavigate();
  const { id } = useLoaderData();
  const { invoiceData } = useGlobalContext();
  const loadedInvoice = invoiceData.find((invoice) => invoice.id === id);

  if (loadedInvoice) {
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
            {/* {console.log(id)} */}
          </span>
          <span>Go back</span>
        </Link>
        <InfoBar
          status={loadedInvoice.status}
          backgroundColor={`${
            loadedInvoice.status === "pending"
              ? "rgba(255, 143, 0, 0.1)"
              : loadedInvoice.status === "paid"
              ? "rgba(51, 214, 159, 0.1)"
              : loadedInvoice.status === "draft"
              ? "rgba(151, 151, 151, 0.1)"
              : ""
          }`}
          color={`${
            loadedInvoice.status === "pending"
              ? "#ff8f00"
              : loadedInvoice.status === "paid"
              ? "#33d69f"
              : loadedInvoice.status === "draft"
              ? "rgb(151, 151, 151)"
              : ""
          }`}
        />
        <InvoiceDetails singleInvoice={loadedInvoice} />
      </section>
    );
  } else {
    navigate("/");
  }
};

export default SingleInvoice;
