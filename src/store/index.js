import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {persistReducer, persistStore} from 'redux-persist';

import storage from './persist-storage.js';

//Services
import user from './user';
import app from './app';

import {referralApi} from './referral/index.js';
import {authApi} from '@/services/auth/index.js';

//using for persist storage, due to ssr or crs
const reducers = combineReducers({
  authApi: authApi.reducer,
  referralApi: referralApi.reducer,
  app: app,
  user: user,
});

//Settings for persists
const rootReducers = (state, action) => {
  return reducers(state, action);
};

//save it to the storage
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: [authApi.reducerPath, 'app', 'user'],
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

export {configuredStore as store, persistor};
