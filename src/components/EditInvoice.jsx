import React, { useEffect } from "react";
import FormInput from "./FormInput";
import { useGlobalContext } from "../Context";
import { useLoaderData, useNavigate } from "react-router-dom";

export const loader = ({ params }) => {
  const { id } = params;
  return { id };
};
const EditInvoice = () => {
  const { id } = useLoaderData();
  const navigate = useNavigate();
  const { editingID, setEditingID, invoiceData, setValue } = useGlobalContext();
  useEffect(() => {
    setEditingID(id);
    const invoiceToEdit = invoiceData.find(
      (invoice) => invoice.id === editingID
    );

    if (invoiceToEdit) {
      Object.entries(invoiceToEdit).forEach(([key, value]) =>
        setValue(key, value)
      );
    }

    // Return the cleanup function
    return () => {
      setEditingID(null); // Reset the editingID when the component unmounts or when conditions are met
    };
  }, [editingID, id, invoiceData, setValue]);
  // const { invoiceData, setValue, setEditingID } = useGlobalContext();
  // const formInvoiceToEdit = invoiceData.find((invoice) => invoice.id === id);
  // console.log(formInvoiceToEdit);

  // useEffect(() => {
  //   if (formInvoiceToEdit) {
  //     setEditingID(id);
  //     Object.entries(formInvoiceToEdit).forEach(([key, value]) =>
  //       setValue(key, value)
  //     );
  //   } else {
  //     navigate("/");
  //     setEditingID(null);
  //   }
  // }, [formInvoiceToEdit, id, setValue, navigate]);
  return (
    <main className="invoice-section">
      <section className="new-invoice">
        <FormInput />
      </section>
    </main>
  );
};

export default EditInvoice;
