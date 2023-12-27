import { languages } from "@/app/i18n/settings";
import { getSelectedLanguage } from "@/utils";
import { usePathname } from "next/navigation";

const LanguageSwitcher = () => {
  const path = usePathname();
  const selectedLangue = getSelectedLanguage();

  //TODO: Try to find the best approach when switching the language
  const generateLanguageLink = (lng) => {
    const newPath = path.replace(selectedLangue, lng);
    return newPath;
  };

  return (
    <>
      <div>
        {Object.keys(languages).map((key, index) => {
          return (
            <a
              style={{ cursor: "pointer", marginRight: 10 }}
              key={index}
              href={generateLanguageLink(languages[key])}
            >
              {languages[key]}
            </a>
          );
        })}
      </div>
    </>
  );
};
export default LanguageSwitcher;
