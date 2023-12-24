"use client";
import ReduxProvider from "./redux";

const RootProvider = ({ children }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};
export default RootProvider;
