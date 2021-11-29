import { combineReducers } from "redux";

import authReducer from "./authReducer";
import shoppingReducer from "./shoppingReducer";

const rootReducer = combineReducers({
  authReducer,
  shoppingReducer
});

export default rootReducer;
