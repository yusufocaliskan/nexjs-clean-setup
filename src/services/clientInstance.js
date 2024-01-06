import { appConfigs } from "@/configs";
import { store } from "@/store";
import { getSelectedLanguage } from "@/utils";
import axios from "axios";

const clientInstance = axios.create({
  baseURL: appConfigs.api.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

//on request
clientInstance.interceptors.request.use(
  (config) => {
    //set the bearer tokens..
    const userStore = store.getState().user;
    const appStore = store.getState().app;
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token.AuthToken}`;
      config.headers["X-CSRF-Token"] = `${userStore.token.CSRFToken}`;
    }

    config.headers["X-LANGUAGE-LOCALE"] = `${appStore.selectedLanguage}`;
    return config;
  },
  //On Rejected request
  (error) => {
    return Promise.reject(error);
  },
);

//On response
clientInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  //On rejected error
  (error) => {
    return Promise.reject(error);
  },
);

export default clientInstance;
