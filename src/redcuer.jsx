import {
  calculateDueDate,
  calculateTotal,
  formatDate,
  generateUniqueId,
  getCurrentDate,
  hasEmptyValues,
} from "./utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_INPUT":
      const { name, value } = action.payload;

      return {
        ...state,
        inputData: { ...state.inputData, [name]: value },
      };
    case "ADD_NEW_ITEM":
      const { itemName, itemQuantity, itemPrice } = action.payload;
      const newItem = {
        name: itemName,
        quantity: itemQuantity,
        price: itemPrice,
        total: itemPrice * itemQuantity,
      };
      return {
        ...state,
        inputData: {
          ...state.inputData,
          items: [...state.inputData.items, newItem],
        },
      };
    case "SUBMIT_FORM":
      const newInvoice = {
        id: generateUniqueId(state.invoiceData),
        createdAt: getCurrentDate(),
        paymentDue: calculateDueDate(state.inputData.dueDate),
        description: state.inputData.projectDescription,
        paymentTerms: "",
        clientName: state.inputData.clientName,
        clientEmail: state.inputData.clientEmail,
        status: "pending",
        senderAddress: {
          street: state.inputData.senderStreet,
          city: state.inputData.senderCity,
          postCode: state.inputData.senderPostCode,
          country: state.inputData.senderCountry,
        },
        clientAddress: {
          street: state.inputData.clientStreet,
          city: state.inputData.clientCity,
          postCode: state.inputData.clientPostCode,
          country: state.inputData.clientCountry,
        },
        items: [state.inputData.items],
        total: calculateTotal(state),
      };
      const resetInput = {
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
      };
      return {
        ...state,
        invoiceData: [...state.invoiceData, newInvoice],
        inputData: resetInput,
      };

    case "SAVE_AS_DRAFT":
      return {
        ...state,
        // status: "pending",
      };
    default:
      return state;
  }
};
export default reducer;
