import React, { createContext, useContext, useState, useReducer } from "react";
import { jsonData } from "./data";
import reducer from "./redcuer";
import { useFieldArray, useForm } from "react-hook-form";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const initialState = {
    invoiceData: [...jsonData],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { register, control, handleSubmit, formState, getValues } = useForm({
    defaultValues: {
      clientName: "Jensen Huang",
      clientEmail: "jensenh@mail.com",
      status: "paid",
      createdAt: new Date(),
      paymentDue: new Date(),
      description: "Re-branding",
      senderAddress: {
        street: "19 Union Terrace",
        city: "London",
        postCode: "E1 3EZ",
        country: "United Kingdom",
      },
      clientAddress: {
        street: "106 Kendell Street",
        city: "Sharrington",
        postCode: "NR24 5WQ",
        country: "United Kingdom",
      },
      items: [
        {
          name: "",
          quantity: 0,
          price: 0,
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "items",
    control,
  });
  const handleGetValues = () => {
    console.log(getValues());
  };
  const onError = (error) => {
    console.log(error);
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        register,
        control,
        handleSubmit,
        formState,
        getValues,
        fields,
        append,
        remove,
        handleGetValues,
        useForm,
        useFieldArray,
        onError,
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
