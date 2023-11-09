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
    default:
      return state;
  }
};
export default reducer;
