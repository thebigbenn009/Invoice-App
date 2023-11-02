import React, { createContext, useContext, useState } from "react";
import { jsonData } from "./data";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState(jsonData);

  const [formData, setFormData] = useState({
    billerAddress: "",
    billerCity: "",
    billerPostCode: "",
    billerCountry: "",
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    clientCity: "",
    clientPostCode: "",
    clientCountry: "",
    invoiceDate: "",
    paymentTerms: "",
    projectDescription: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
