import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { jsonData } from "./data";
import reducer from "./redcuer";
import { useFieldArray, useForm } from "react-hook-form";
import { calculateDueDate, generateUniqueId, isEmpty } from "./utils";
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
  const { errors } = formState;
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
    if (editingID !== null) {
      const updatedInvoice = invoiceData.map((invoice) =>
        invoice.id === editingID ? { ...data, status: "pending" } : invoice
      );
      setInvoiceData(updatedInvoice);
      setLocalStorage(updatedInvoice, "invoice");
      setEditingID(null);
    } else {
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
    }

    reset();
    console.log(data);
  };
  //function to handle save to drafts
  const saveAsDraft = (data) => {
    const enteredClientName = getValues("clientName");

    if (enteredClientName) {
      console.log(getValues());
    } else {
      alert("Please fill out the Name field before saving to drafts.");
    }
    if (editingID) {
      setInvoiceData((invoice) =>
        invoice.id === editInvoice ? { ...invoice, ...getValues() } : invoice
      );
    } else {
      const newInvoice = {
        id: generateUniqueId(invoiceData),
        status: "draft",

        ...data,
        total: data.items
          ? data.items.map((item) => item.total).reduce((a, b) => a + b, 0)
          : "",
      };
      const newInvoiceArray = [...invoiceData, newInvoice];
      setInvoiceData(newInvoiceArray);
      setLocalStorage(newInvoiceArray, "invoice");
    }
    reset();
    console.log(invoiceData);
  };
  //function to handle save to reset fields
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
        console.log(singleInvoice);
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
    setEditingID(null);
    setSingleInvoice(null);
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
        resetField,
        getSingleInvoice,
        singleInvoice,
        fetchCountrySymbol,
        editInvoice,
        markAsPaid,
        showModal,
        setShowModal,
        deleteInvoice,
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
