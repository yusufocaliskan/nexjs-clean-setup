import { appConfigs } from "@/configs";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from "react-redux";

const GoogleReCaptcha = ({ onChange, reCapthchaRef }) => {
  const app = useSelector((state) => state.app);
  const theme = app.currentTheme == "dark_theme" ? "dark" : "light";

  return (
    <ReCAPTCHA
      ref={reCapthchaRef}
      onChange={onChange}
      theme={theme}
      sitekey={appConfigs.reCapthcha.site_key}
    />
  );
};
export default GoogleReCaptcha;
