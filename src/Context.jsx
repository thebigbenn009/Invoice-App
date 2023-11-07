import React, { createContext, useContext, useState, useEffect } from "react";
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
    items: [],
    total: "",
  });
  const [inputData, setInputData] = useState({
    clientName: "",
    clientEmail: "",
    senderStreet: "",
    senderCity: "",
    senderPostCode: "",
    senderCountry: "",
    clientStreet: "",
    clientCity: "",
    clientPostCode: "",
    clientCountry: "",
    projectDescription: "",
  });
  const [itemInputs, setItemInputs] = useState({
    name: "",
    quantity: "",
    price: "",
    total: "",
  });
  const handleSubmitBtn = (e) => {
    e.preventDefault();
    const {
      clientName,
      clientEmail,
      senderStreet,
      senderCity,
      senderPostCode,
      senderCountry,
      clientStreet,
      clientCity,
      clientPostCode,
      clientCountry,
      projectDescription,
    } = inputData;
    const senderDetails = {
      street: senderStreet,
      city: senderCity,
      postCode: senderPostCode,
      country: senderCountry,
    };
    const clientDetails = {
      street: clientStreet,
      city: clientCity,
      postCode: clientPostCode,
      country: clientCountry,
    };
    setFormData((prevData) => {
      return {
        ...prevData,
        senderAddress: { ...senderDetails },
        clientAddress: { ...clientDetails },
        clientName: clientName,
        clientEmail: clientEmail,
        description: projectDescription,
      };
    });
    console.log(formData);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleItemChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setItemInputs((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const addNewItem = (e) => {
    e.preventDefault();
    const newItem = {
      ...itemInputs,
      total: itemInputs.price * itemInputs.quantity,
    };
    setFormData((prevForm) => {
      return { ...prevForm, items: [...prevForm.items, newItem] };
    });
    setItemInputs({
      name: "",
      quantity: "",
      price: "",
      total: "",
    });
  };

  return (
    <AppContext.Provider
      value={{
        invoiceData,
        setInvoiceData,
        formData,
        setFormData,
        inputData,
        setInputData,
        handleInputChange,
        handleSubmitBtn,
        addNewItem,
        handleItemChange,
        itemInputs,
        setItemInputs,
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
