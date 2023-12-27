import { useTranslation } from "@/app/i18n/client";
import { setTheme } from "@/store/app";
import { getSelectedLanguage } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import CoolButton from "../form/CoolButton";

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const selectedLanguage = getSelectedLanguage();
  const app = useSelector((state) => state.app);
  const { t } = useTranslation(selectedLanguage);

  //Switching current themee
  const handleSwitcheTheme = (theme) => {
    //REmove opposite
    if (theme == "dark_theme") {
      document.body.classList.remove("light_theme");
    } else {
      document.body.classList.remove("dark_theme");
    }

    document.body.classList.add(theme);
    dispatch(setTheme(theme));
  };

  //TODO: client system sttings
  // useEffect(() => {
  //   const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
  //   prefersDarkMode.addEventListener("change", handleSwitcheTheme);
  // }, []);

  return (
    <>
      <CoolButton
        label={app.currentTheme !== "dark_theme" ? t("dark") : t("light")}
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
