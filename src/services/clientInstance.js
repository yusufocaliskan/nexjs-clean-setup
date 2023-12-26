import { appConfigs } from "@/configs";
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
