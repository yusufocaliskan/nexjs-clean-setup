"use client";
import ThemeProvider from "@/theme/provider";
import ReduxProvider from "./redux";

const RootProvider = ({ children }) => {
  return (
    <>
      <ReduxProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ReduxProvider>{" "}
    </>
  );
};
export default RootProvider;
