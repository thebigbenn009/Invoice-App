import React from "react";

import InvoiceCard from "./InvoiceCard";
import { useGlobalContext } from "../Context";

const InvoiceContainer = () => {
  const { invoiceData } = useGlobalContext();
  return (
    <section className="invoice-container">
      {invoiceData.map((invoice) => {
        return (
          <InvoiceCard
            key={invoice.id}
            {...invoice}
            backgroundColor={`${
              invoice.status === "pending"
                ? "rgba(255, 143, 0, 0.1)"
                : invoice.status === "paid"
                ? "rgba(51, 214, 159, 0.1)"
                : invoice.status === "draft"
                ? "rgba(151, 151, 151, 0.1)"
                : ""
            }`}
            color={`${
              invoice.status === "pending"
                ? "#ff8f00"
                : invoice.status === "paid"
                ? "#33d69f"
                : invoice.status === "draft"
                ? "rgb(151, 151, 151)"
                : ""
            }`}
          />
        );
      })}
    </section>
  );
};

export default InvoiceContainer;
