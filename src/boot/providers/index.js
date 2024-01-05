"use client";
import ThemeProvider from "@/theme/provider";
import ReduxProvider from "./redux";
import NextAuthCustomProvider from "./nextAuth";

const RootProvider = ({ children }) => {
  return (
    <>
      <ReduxProvider>
        <NextAuthCustomProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </NextAuthCustomProvider>
      </ReduxProvider>
    </>
  );
};
export default RootProvider;
