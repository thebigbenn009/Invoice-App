import {
  calculateDueDate,
  calculateTotal,
  formatDate,
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
        id: Date.now(),
        createdAt: formatDate(new Date()),
        paymentDue: calculateDueDate(state.inputData.dueDate),
        description: state.inputData.projectDescription,
        paymentTerms: "",
        clientName: state.inputData.clientName,
        clientEmail: state.inputData.clientEmail,
        status: "",
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
