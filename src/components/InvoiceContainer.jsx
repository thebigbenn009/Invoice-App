import React from "react";

import InvoiceCard from "./InvoiceCard";
import { useGlobalContext } from "../Context";

const InvoiceContainer = () => {
  const { invoiceData } = useGlobalContext();
  return (
    <section className="invoice-container">
      <InvoiceCard />
    </section>
  );
};

export default InvoiceContainer;
