let defaultState = {
  userInfo: { userId: "", name: "", email: "" },
};
let userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "CREATE_ACCOUNT": {
      { 
        let newState = { ...state };
        newState.userInfo = {
          userId: action.payload.userId,
          name: action.payload.name,
          email: action.payload.email,
        };
        console.log("user info saved");
        return newState;
      }
    }
    case "LOG_IN": {
        
        let newState = { ...state };
        newState.userInfo = {
          userId: action.payload.userId,
          name: action.payload.name,
          email: action.payload.email,
        };
        console.log("user logged in");
        console.log(newState)
        return newState;
      }
      default:
      return state;
  }
};

export default userReducer;