import React, { createContext, useContext, useState, useReducer } from "react";
import { jsonData } from "./data";

import reducer from "./redcuer";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const initialState = {
    invoiceData: [...jsonData],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider
      value={{
        ...state,
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
