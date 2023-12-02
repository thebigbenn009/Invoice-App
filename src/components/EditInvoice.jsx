import React, { useEffect } from "react";
import FormInput from "./FormInput";
import { useGlobalContext } from "../Context";
import { useLoaderData, useNavigate } from "react-router-dom";
import { key } from "localforage";

export const loader = ({ params }) => {
  const { id } = params;
  return { id };
};
const EditInvoice = () => {
  const { id } = useLoaderData();
  const navigate = useNavigate();
  const { invoiceData, setValue } = useGlobalContext();
  const formInvoiceToEdit = invoiceData.find((invoice) => invoice.id === id);

  useEffect(() => {
    if (formInvoiceToEdit) {
      Object.entries(formInvoiceToEdit).forEach(([key, value]) =>
        setValue(key, value)
      );
    } else {
      navigate("/");
    }
  }, [formInvoiceToEdit, id, setValue, navigate]);
  return (
    <main className="invoice-section">
      <section className="new-invoice">
        <FormInput />
      </section>
    </main>
  );
};

export default EditInvoice;
