import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import userReducer from "./userReducer";

let reducers = combineReducers({
  cartReducer: cartReducer,
  userReducer: userReducer,
});

const rootReducers = (state, action) => {
  return reducers(state, action);
};

export default rootReducers;
