import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { jsonData } from "./data";
import reducer from "./redcuer";
import { redirect, useNavigate } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { calculateDueDate, generateUniqueId, isEmpty } from "./utils";
import { key } from "localforage";
const countryAPI = `https://restcountries.com/v3.1/name/`;

const AppContext = createContext();
const setLocalStorage = (invoice, data) => {
  localStorage.setItem(data, JSON.stringify(invoice));
};

const defaultInvoiceList = JSON.parse(
  localStorage.getItem("invoice") || `${JSON.stringify(jsonData)}`
);
const defaultSingleInvoiceList = JSON.parse(
  localStorage.getItem("singleInvoice") || "{}"
);
const AppProvider = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState(defaultInvoiceList);

  const [singleInvoice, setSingleInvoice] = useState(defaultSingleInvoiceList);
  const [showModal, setShowModal] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState,
    getValues,
    setError,
    setValue,
    watch,
    reset,
  } = useForm();
  const { errors, isSubmitted } = formState;
  const { remove, fields, insert } = useFieldArray({
    name: "items",
    control,
  });
  const [editingID, setEditingID] = useState(null);
  const fetchCountrySymbol = async (country) => {
    try {
      const response = await fetch(`${countryAPI}${country}`);
      const data = await response.json();
      // console.log(data);
      const currencies = data[0]?.currencies;
      const curr = Object.keys(currencies)[0];
      const { symbol } = currencies[curr];
      // console.log(symbol);
      return symbol;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const onSubmit = (data) => {
    const itemsArray = watch("items");
    // let newInvoice;
    if (itemsArray.length === 0) {
      console.log("items must be placed");
      return;
    }
    // When you are editing an invoice
    if (editingID !== null) {
      const updatedInvoice = invoiceData.map((invoice) => {
        if (invoice.id === editingID) {
          console.log(data);
          return {
            ...data,
            total: data.items
              .map((item) => item.total)
              .reduce((a, b) => a + b, 0),
            status: "pending",
          };
        } else {
          return invoice;
        }
      });
      setInvoiceData(updatedInvoice);
      setLocalStorage(updatedInvoice, "invoice");
      setEditingID(null);
    } else {
      //When you are creating a new invoice
      const newInvoice = {
        id: generateUniqueId(invoiceData),
        status: "pending",
        // paymentDue: calculateDueDate(getValues("paymentTerms")),
        ...data,
        total: data.items.map((item) => item.total).reduce((a, b) => a + b, 0),
      };
      const newInvoiceArray = [...invoiceData, newInvoice];
      setInvoiceData(newInvoiceArray);
      setLocalStorage(newInvoiceArray, "invoice");
      console.log(isSubmitted);
    }

    reset();
    console.log(data);
  };

  //function to handle save to drafts
  const saveAsDraft = (data) => {
    const enteredClientName = getValues("clientName");
    const itemsInInvoice = watch("items");
    console.log(itemsInInvoice);

    if (enteredClientName) {
      // console.log(getValues());
    } else {
      alert("Please fill out the Name field before saving to drafts.");
    }
    console.log("saved to drafts");
    console.log(editingID);
    if (editingID !== null) {
      console.log("yes");
      console.log({
        ...getValues(),
        total: itemsInInvoice
          .map((item) => item.total)
          .reduce((a, b) => a + b, 0),
      });
      const updatedInvoice = invoiceData.map((invoice) =>
        invoice.id === editingID
          ? {
              ...getValues(),
              total: itemsInInvoice
                .map((item) => item.total)
                .reduce((a, b) => a + b, 0),
              status: "pending",
            }
          : invoice
      );
      console.log(updatedInvoice);
      // const updatedInvoice = invoiceData.map((invoice) => {
      //   if (invoice.id === editingID) {
      //     console.log(invoice);

      //     return { ...invoice, ...data };
      //   } else {
      //     return invoice;
      //   }
      // });
      // setInvoiceData(updatedInvoice);
    }
  };
  const saved = () => {
    // const enteredClientName = getValues("clientName");
    // if (enteredClientName) {
    //   // console.log(getValues());
    // } else {
    //   alert("Please fill out the Name field before saving to drafts.");
    // }
    // console.log("saved to drafts");
    // console.log(editingID);
    // if (editingID !== null) {
    //   console.log("yes");
    //   const updatedInvoice = invoiceData.map((invoice) => {
    //     if (invoice.id === editingID) {
    //       console.log(invoice);
    //       console.log(data);
    //       return { ...invoice, ...data };
    //     } else {
    //       return invoice;
    //     }
    //   });
    //   setInvoiceData(updatedInvoice);
    // }
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

  const getSingleInvoice = (id) => {
    const singleId = invoiceData.find((invoice) => invoice.id === id);
    setSingleInvoice(singleId);
    setLocalStorage(singleId, "singleInvoice");
  };

  // const editInvoice = (id) => {

  //   Object.entries(singleInvoice).forEach(([key, value]) => {
  //     setValue(key, value);
  //   });
  // };

  const editInvoice = (id) => {
    const invoiceToEdit = invoiceData.find((invoice) => invoice.id === id);
    if (invoiceToEdit) {
      setEditingID(id);
      Object.entries(invoiceToEdit).forEach(([key, value]) =>
        setValue(key, value)
      );
    }
  };
  useEffect(() => {
    if (editingID === null) {
      reset();
    }
  }, [editingID, reset]);

  const markAsPaid = (id) => {
    setSingleInvoice({ ...singleInvoice, status: "paid" });
    console.log(singleInvoice);
    const updatedInvoice = invoiceData.map((invoice) => {
      if (invoice.id === id) {
        // console.log(singleInvoice);
        return { ...invoice, status: "paid" };
      } else return invoice;
    });
    setInvoiceData(updatedInvoice);
    setLocalStorage(updatedInvoice, "invoice");
  };
  const deleteInvoice = (id) => {
    const updatedInvoice = invoiceData.filter((invoice) => invoice.id !== id);
    setInvoiceData(updatedInvoice);
    setLocalStorage(updatedInvoice, "invoice");
    // setDeleted(true);
    setEditingID("");
    // setSingleInvoice({});
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
        setError,
        handlePriceChange,
        handleQuantityChange,
        // resetField,
        getSingleInvoice,
        singleInvoice,
        editingID,
        setEditingID,
        fetchCountrySymbol,
        editInvoice,
        markAsPaid,
        showModal,
        setShowModal,
        deleteInvoice,
        deleted,
        setDeleted,
        isSubmitted,
        reset,
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
