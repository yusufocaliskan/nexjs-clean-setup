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
    localStorage.setItem(timerName, JSON.stringify(counter));
    setCounter(start);
    setIsCounterStarted(true);
  };

  const resetCounter = () => {
    localStorage.setItem(timerName, JSON.stringify(counter));
    setCounter(start);

    setIsCounterStarted(true);
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

  return { counter, startCounter, resetCounter, isCounterStarted };
};
export default useCounter;
