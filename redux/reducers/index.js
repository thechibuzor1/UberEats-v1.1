import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import cardReducer from "./creditCardReducer";
import userReducer from "./userReducer";

let reducers = combineReducers({
  cartReducer: cartReducer,
  userReducer: userReducer,
  cardReducer: cardReducer,
});

const rootReducers = (state, action) => {
  return reducers(state, action);
};

export default rootReducers;
