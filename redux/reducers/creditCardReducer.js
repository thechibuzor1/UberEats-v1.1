let defaultState = {
  val: {
    status: {
      cvc: "incomplete",
      expiry: "valid",
      name: "valid",
      number: "valid",
    },
    valid: false,
    values: {
      cvc: "",
      expiry: "",
      name: "",
      number: "",
      type: undefined,
    },
  },
};

let cardReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_CREDITCARD": {
      let newState = { ...state };
      newState.val = action.payload.form;
      console.log("DISPATCH VALUES");
      console.log(newState);
      return newState;
    }
    default:
      return state;
  }
};
export default cardReducer;
