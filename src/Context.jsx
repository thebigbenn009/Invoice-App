import React, { createContext, useContext, useState } from "react";
import { jsonData } from "./data";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState(jsonData);
  return (
    <AppContext.Provider
      value={{
        invoiceData,
        setInvoiceData,
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
