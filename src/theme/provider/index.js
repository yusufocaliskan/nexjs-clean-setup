import { setTheme } from "@/store/app";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  const app = useSelector((state) => state.app);
  useEffect(() => {
    console.log("Current Themee:", app.currentTheme);
    // const prefersDarkMode = window.matchMedia(
    //   "(prefers-color-scheme: dark)",
    // ).matches;

    //TODO: needs little bit more improvement
    //especialy when refreshing the page
    document.body.classList.toggle("dark_theme");
  }, [app]);

  return <>{children}</>;
};

export default ThemeProvider;
