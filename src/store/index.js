import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import storage from "./persist-storage.js";
import user from "./user";
import app from "./app";

//Services
import { authApi } from "@/services/auth/index.js";
import { referralApi } from "./referral/index.js";

//using for persist storage, due to ssr or crs
const reducers = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [referralApi.reducerPath]: referralApi.reducer,
  user: user,
  app: app,
});

//Settings for persists
const rootReducers = (state, action) => {
  return reducers(state, action);
};

//save it to the storage
const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: [authApi.reducerPath, "app", "user"],
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
    })
      .concat(authApi.middleware)
      .concat(referralApi.middleware),
});

//Before the store initialized
const onRehydrate = () => {};

const persistor = persistStore(configuredStore, null, onRehydrate);

setupListeners(configuredStore.dispatch);

export { configuredStore as store, persistor };
