import React, { createContext, useContext, useState, useReducer } from "react";
import { jsonData } from "./data";

import reducer from "./redcuer";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const initialState = {
    invoiceData: [...jsonData],
    inputData: {
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
      dueDate: "",
      projectDescription: "",
      items: [],
      itemName: "",
      itemQuantity: "",
      itemPrice: "",
    },
    incompleteForm: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_INPUT", payload: { name, value } });
  };

  const addNewItem = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_NEW_ITEM", payload: state.inputData });
  };

  const handleSubmitBtn = (e) => {
    e.preventDefault();

    dispatch({ type: "SUBMIT_FORM", payload: state.inputData });
  };

  const saveAsDraft = (e) => {
    e.preventDefault();
    dispatch({ type: "SAVE_AS_DRAFT" });
  };
  return (
    <AppContext.Provider
      value={{
        saveAsDraft,

        handleInputChange,
        handleSubmitBtn,
        addNewItem,

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
