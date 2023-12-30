import { usePathname } from "next/navigation";

//Getting the selected language from the path.
export const getSelectedLanguage = () => {
  const path = usePathname();
  const lang = path.substring(1).split("/")[0];
  return lang;
};

//Check if the given value is a turkish Id card number
export const isTurkishIdentity = (value) => {
  let sum = 0;
  let sum2 = 0;
  let sum3 = 0;

  for (let i = 0; i < 10; i++) {
    sum += Number(value[i]);
    if (i % 2 === 0) {
      sum2 += Number(value[i]);
    } else if (i !== 9) {
      sum3 += Number(value[i]);
    }
  }

  const isValid =
    (sum2 * 7 - sum3) % 10 === Number(value[9]) &&
    sum % 10 === Number(value[10]);
  return isValid;
};
