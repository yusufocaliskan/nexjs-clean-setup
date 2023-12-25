import { useEffect } from "react";
import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  const app = useSelector((state) => state.app);

  useEffect(() => {
    //Set the currentTheme at the start-up
    document.body.classList.add(app.currentTheme);
  }, [app]);

  return <>{children}</>;
};

export default ThemeProvider;
