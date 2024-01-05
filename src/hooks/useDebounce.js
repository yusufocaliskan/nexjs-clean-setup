import { useEffect, useState } from "react";

//REturns the given text on timeout
const useDebounce = (text, tiemout) => {
  const [getTextInResult, setTextInResult] = useState();
  useEffect(() => {
    if (text) {
      const timerId = setTimeout(() => {
        setTextInResult(text);
      }, tiemout);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [text]);

  return [getTextInResult];
};

export default useDebounce;
