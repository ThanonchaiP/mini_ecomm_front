import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import rootReducer from "./reducers/index";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["shoppingReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
  let persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
