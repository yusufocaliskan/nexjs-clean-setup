import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {persistReducer, persistStore} from 'redux-persist';
import storage from './persist-storage.js';

//Services
import user from './user';
import app from './app';

import {authApi} from '@/services/auth/index.js';
import {userApi} from '@/services/user/index.js';
import {referralApi} from '@/services/referral/index.js';
import {setClientInstanHeaders} from '@/services/clientInstance.js';
import {clientInstanceListener} from './clientInstanceListener.js';
import {accountApi} from '@/services/account/index.js';
import {apiPageApi} from '@/services/account/apiPage/index.js';

//using for persist storage, due to ssr or crs
const reducers = combineReducers({
  app: app,
  user: user,
  authApi: authApi.reducer,
  referralApi: referralApi.reducer,
  userApi: userApi.reducer,
  accountApi: accountApi.reducer,
  apiPageApi: apiPageApi.reducer,
});

//Settings for persists
const rootReducers = (state, action) => {
  return reducers(state, action);
};

//save it to the storage
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['app', 'user'],
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
      .concat(authApi.middleware, userApi.middleware, referralApi.middleware, apiPageApi.middleware)

      //Listinin tokens
      .prepend(clientInstanceListener.middleware),
});

//Before the store initialized
const onRehydrate = () => {
  //Set token, if there was.
  const userStore = configuredStore.getState()?.user;
  const appStore = configuredStore.getState()?.app;
  setClientInstanHeaders(userStore, appStore);
};

const persistor = persistStore(configuredStore, null, onRehydrate);

setupListeners(configuredStore.dispatch);

export {configuredStore as store, persistor};
