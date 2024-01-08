import { languages } from "@/app/i18n/settings";
import { setSelectedLanguage } from "@/store/app";
import { getSelectedLanguage } from "@/utils";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import "./index.scss";

const LanguageSwitcher = () => {
  const path = usePathname();
  const selectedLanguage = getSelectedLanguage();
  const router = useRouter();
  const dispatch = useDispatch();

  const generateLanguageLink = (lng) => {
    const newPath = path.replace(selectedLanguage, lng);
    return newPath;
  };

  const handleOnLanguageSwitched = (lang) => {
    const path = generateLanguageLink(lang);
    dispatch(setSelectedLanguage(lang));
    router.push(path);
  };

  return (
    <>
      <div>
        <select
          className="language-switch"
          value={selectedLanguage}
          onChange={(e) => handleOnLanguageSwitched(e.target.value)}
        >
          {Object.keys(languages).map((key, index) => (
            <option key={index} value={languages[key]}>
              {languages[key]}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
export default LanguageSwitcher;
