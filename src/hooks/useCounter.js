import { appConfigs } from "@/configs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useCounter = (timerName, start) => {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(start);
  const [isCounterStarted, setIsCounterStarted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(timerName);
    setCounter(stored);
  }, []);

  const startCounter = () => {
    try {
      localStorage.setItem(timerName, JSON.stringify(counter));
      setCounter(start);
      setIsCounterStarted(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (counter > 0) {
        setCounter(counter - 1);
        localStorage.setItem(timerName, JSON.stringify(counter - 1));

        setIsCounterStarted(true);
      } else {
        setIsCounterStarted(false);
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [counter]);

  return { counter, startCounter, isCounterStarted };
};
export default useCounter;
