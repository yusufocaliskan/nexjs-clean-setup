import { languages } from "@/app/i18n/settings";
import { setSelectedLanguage } from "@/store/app";
import { getSelectedLanguage } from "@/utils";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const LanguageSwitcher = () => {
  const path = usePathname();
  const selectedLangue = getSelectedLanguage();
  const router = useRouter();
  const dispatch = useDispatch();

  const generateLanguageLink = (lng) => {
    const newPath = path.replace(selectedLangue, lng);
    console.log(newPath);
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
        {Object.keys(languages).map((key, index) => {
          return (
            <div
              style={{ cursor: "pointer", marginRight: 10 }}
              key={index}
              onClick={() => handleOnLanguageSwitched(languages[key])}
            >
              {languages[key]}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default LanguageSwitcher;
