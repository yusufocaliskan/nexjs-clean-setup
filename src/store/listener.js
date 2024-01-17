import {createListenerMiddleware} from '@reduxjs/toolkit';
import {setToken} from './user';
import {setClientInstanHeaders} from '@/services/clientInstance';

//When token has changed
export const clientInstanceListener = createListenerMiddleware();
clientInstanceListener.startListening({
  actionCreator: setToken,
  effect: async (action, listenerApi) => {
    const userStore = listenerApi.getState().user;
    const appStore = listenerApi.getState().app;
    setClientInstanHeaders(userStore, appStore);
    listenerApi.cancelActiveListeners();
  },
});
