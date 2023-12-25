import { setTheme } from "@/store/app";
import { useDispatch, useSelector } from "react-redux";

const { default: CoolButton } = require("../form/CoolButton");

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);
  const handleSwitcheTheme = (theme) => {
    dispatch(setTheme(theme));
  };

  return (
    <>
      {app.currentTheme == "dark_theme" && (
        <CoolButton
          label="light"
          onClick={() => handleSwitcheTheme("light_theme")}
        />
      )}
      {app.currentTheme == "light_theme" && (
        <CoolButton
          label="dark"
          onClick={() => handleSwitcheTheme("dark_theme")}
        />
      )}
    </>
  );
};
export default ThemeSwitcher;
