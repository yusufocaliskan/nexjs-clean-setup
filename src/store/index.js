import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import market from "./market";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  market,
});

//Settings for persists
const rootReducers = (state, action) => {
  return reducers(state, action);
};

//save it to the storage
const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["market"],
};

//Combine theme.
const persistedReducers = persistReducer(persistConfig, rootReducers);

//Prepare middlwares
//configure the store.
const configuredStore = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

//Before the store initialized
const onRehydrate = () => {};

const persistor = persistStore(configuredStore, {}, onRehydrate);

export { configuredStore as store, persistor };
