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
          createdAt: Date.now(),
          paymentDue: "",
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

          total: state.formData.items
            .map((item) => item.total)
            .reduce((a, b) => a + b, 0),
        },
      };
    default:
      return state;
  }
};
export default reducer;
