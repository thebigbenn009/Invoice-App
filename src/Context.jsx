import React, { createContext, useContext, useReducer, useState } from "react";
import { jsonData } from "./data";
import reducer from "./redcuer";
import { useFieldArray, useForm } from "react-hook-form";
import { generateUniqueId } from "./utils";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState([...jsonData]);

  const {
    register,
    control,
    handleSubmit,
    formState,
    getValues,
    setValue,
    watch,
    reset,
  } = useForm();
  const { errors } = formState;
  const { remove, fields, insert } = useFieldArray({
    name: "items",
    control,
  });
  const onSubmit = (data) => {
    const itemsArray = watch("items");
    if (itemsArray.length === 0) {
      console.log("items must be placed");
      return;
    }
    setInvoiceData((prevInvoice) => {
      const newInvoice = {
        id: generateUniqueId(prevInvoice),
        status: "pending",
        ...data,
      };
      return [...prevInvoice, newInvoice];
    });
    console.log(data);
  };
  //function to handle save to drafts
  const saveAsDraft = (data) => {
    const enteredClientName = watch("clientName");
    if (enteredClientName) {
      console.log(getValues());
    } else {
      alert("Please fill out the Name field before saving to drafts.");
    }
  };
  //function to handle save to drafts
  const resetField = () => {
    reset();
  };
  //function to handle price change and update total dynamically
  const handlePriceChange = (index, value) => {
    setValue(`items.${index}.price`, value, { shouldValidate: true });
    const quantity = watch(`items.${index}.quantity`);
    if (quantity !== undefined) {
      setValue(`items.${index}.total`, value * quantity);
    }
  };
  //function to handle quantity change and update total dynamically
  const handleQuantityChange = (index, value) => {
    setValue(`items.${index}.quantity`, value, { shouldValidate: true });
    const price = watch(`items.${index}.price`);
    if (price !== undefined) {
      setValue(`items.${index}.total`, value * price);
    }
  };
  return (
    <AppContext.Provider
      value={{
        invoiceData,
        setInvoiceData,
        register,
        control,
        handleSubmit,
        formState,
        getValues,
        setValue,
        fields,
        insert,
        remove,
        saveAsDraft,
        watch,
        onSubmit,
        errors,
        handlePriceChange,
        handleQuantityChange,
        resetField,
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
