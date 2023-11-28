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
import { generateUniqueId } from "./utils";
const countryAPI = `https://restcountries.com/v3.1/name/`;

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState([...jsonData]);
  const [singleInvoice, setSingleInvoice] = useState({});

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
  const fetchCountrySymbol = async (country) => {
    try {
      const response = await fetch(`${countryAPI}${country}`);
      const data = await response.json();
      console.log(data);
      const currencies = data[0]?.currencies;
      const curr = Object.keys(currencies)[0];
      const { symbol } = currencies[curr];
      console.log(symbol);
      return symbol;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
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
        total: data.items.map((item) => item.total).reduce((a, b) => a + b, 0),
      };
      return [...prevInvoice, newInvoice];
    });
    reset();
    console.log(data);
  };
  //function to handle save to drafts
  const saveAsDraft = (data) => {
    const enteredClientName = getValues("clientName");

    if (enteredClientName) {
      console.log(getValues());
    } else {
      // setError("clientName", {
      //   type: "manual",
      //   message: "clientName required",
      // });
      alert("Please fill out the Name field before saving to drafts.");
    }
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
  };

  // const [country, setCountry] = useState("");
  // const [currencySymbol, setCurrencySymbol] = useState("");
  useEffect(() => {
    // fetchCountrySymbol("South Afr");
  }, []);
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
