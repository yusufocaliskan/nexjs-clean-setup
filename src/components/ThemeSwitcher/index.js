import { setTheme } from "@/store/app";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const { default: CoolButton } = require("../form/CoolButton");

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);

  //Switching current themee
  const handleSwitcheTheme = (theme) => {
    console.log(theme);
    //REmove opposite
    if (theme == "dark_theme") {
      document.body.classList.remove("light_theme");
    } else {
      document.body.classList.remove("dark_theme");
    }

    document.body.classList.add(theme);
    dispatch(setTheme(theme));
  };

  // useEffect(() => {
  //   const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
  //   prefersDarkMode.addEventListener("change", handleSwitcheTheme);
  // }, []);

  return (
    <>
      <CoolButton
        label={app.currentTheme == "dark_theme" ? "dark" : "light"}
        onClick={() =>
          handleSwitcheTheme(
            app.currentTheme == "dark_theme" ? "light_theme" : "dark_theme",
          )
        }
      />
    </>
  );
};
export default ThemeSwitcher;
