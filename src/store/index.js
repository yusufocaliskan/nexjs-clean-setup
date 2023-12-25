import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import storage from "./persist-storage.js";
import user, { loginApi } from "./users";

//using for persist storage, due to ssr or crs
const reducers = combineReducers({
  [loginApi.reducerPath]: loginApi.reducer,
  user: user,
});

//Settings for persists
const rootReducers = (state, action) => {
  return reducers(state, action);
};

//save it to the storage
const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: [loginApi.reducerPath],
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
    }).concat(loginApi.middleware),
});

//Before the store initialized
const onRehydrate = () => {};
const persistor = persistStore(configuredStore, {}, onRehydrate);

setupListeners(configuredStore.dispatch);
export { configuredStore as store, persistor };
