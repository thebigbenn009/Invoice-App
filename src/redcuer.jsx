import { calculateDueDate, calculateTotal, formatDate } from "./utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_NEW_ITEM":
      return {
        ...state,
        formData: {
          ...state.formData,
          items: [
            ...state.formData.items,
            {
              name: action.payload.name,
              quantity: action.payload.quantity,
              price: action.payload.price,
              total: action.payload.total,
            },
          ],
        },
      };
    case "SUBMIT_FORM":
      const {
        clientName,
        clientEmail,
        senderStreet,
        senderCity,
        senderPostCode,
        senderCountry,
        clientStreet,
        clientCity,
        clientPostCode,
        clientCountry,
        projectDescription,
        dueDate,
      } = action.payload;
      const senderAddress = {
        street: senderStreet,
        city: senderCity,
        postCode: senderPostCode,
        country: senderCountry,
      };
      const clientAddress = {
        street: clientStreet,
        city: clientCity,
        postCode: clientPostCode,
        country: clientCountry,
      };
      return {
        ...state,
        formData: {
          ...state.formData,
          id: Date.now(),
          createdAt: formatDate(new Date()),
          paymentDue: calculateDueDate(dueDate),
          description: projectDescription,
          paymentTerms: "",
          clientName: clientName,
          clientEmail: clientEmail,
          status: "",
          senderAddress: {
            ...senderAddress,
          },
          clientAddress: {
            ...clientAddress,
          },

          total: calculateTotal(state),
        },
      };
    default:
      return state;
  }
};
export default reducer;
