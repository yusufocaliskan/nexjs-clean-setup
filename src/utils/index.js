import { usePathname } from "next/navigation";

//Getting the selected language from the path.
export const getSelectedLanguage = () => {
  const path = usePathname();
  const lang = path.substring(1).split("/")[0];
  return lang;
};
