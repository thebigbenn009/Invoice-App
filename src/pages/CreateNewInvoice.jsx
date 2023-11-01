import React from "react";
import InvoiceForm from "../components/InvoiceForm";

const CreateNewInvoice = () => {
  return (
    <main className="invoice-section">
      <section className="new-invoice">
        <InvoiceForm />
      </section>
    </main>
  );
};

export default CreateNewInvoice;
