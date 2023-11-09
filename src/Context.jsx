import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { jsonData } from "./data";
import { formatDate } from "./utils";
import reducer from "./redcuer";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState(jsonData);
  const initialState = {
    status: "",
    formData: {
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
    },
  };
  const [state, dispatch] = useReducer(reducer, initialState);

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
    itemName: "",
    itemQuantity: "",
    itemPrice: "",
    itemTotal: "",
  });

  const addNewItem = (e) => {
    e.preventDefault();
    const newItem = {
      name: inputData.itemName,
      quantity: inputData.itemQuantity,
      price: inputData.itemPrice,
      total: inputData.itemPrice * inputData.itemQuantity,
    };
    dispatch({ type: "ADD_NEW_ITEM", payload: newItem });
  };

  const handleSubmitBtn = (e) => {
    e.preventDefault();

    dispatch({ type: "SUBMIT_FORM", payload: inputData });

    console.log(formData);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };
  return (
    <AppContext.Provider
      value={{
        invoiceData,
        setInvoiceData,

        inputData,
        setInputData,
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
