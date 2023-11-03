import React, { createContext, useContext, useState } from "react";
import { jsonData } from "./data";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState(jsonData);

  const [formData, setFormData] = useState({
    id: "",
    createdAt: "",
    paymentDue: "",
    description: "",
    paymentTerms: "",
    clientName: "",
    clientEmail: "",
    status: "",
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    items: [
      {
        name: "",
        quantity: "",
        price: "",
        total: "",
      },
    ],
    total: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleAddNewItem = (e) => {
    e.preventDefault();
    const newItem = {
      name: "",
      quantity: "",
      price: "",
      total: "",
    };
    setFormData((prevForm) => ({
      ...prevForm,
      items: [...prevForm.items, newItem],
    }));
  };

  const handleSubmitBtn = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <AppContext.Provider
      value={{
        invoiceData,
        setInvoiceData,
        formData,
        setFormData,
        handleInputChange,
        handleSubmitBtn,
        handleAddNewItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export default AppProvider;
