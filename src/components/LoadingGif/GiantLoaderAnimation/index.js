const { default: LoadingGif } = require("..");

import { TfiClose } from "react-icons/tfi";
import "./style.scss";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const GiantLoaderAnimation = ({ isOpen, setIsOpen }) => {
  const [isCloseButtonVisiable, setIsCloseButtonVisiable] = useState(false);

  //wait sometimes to display the closer
  useEffect(() => {
    const timerID = setTimeout(() => {
      setIsCloseButtonVisiable(true);
    }, 20000);
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  if (!isOpen) return;
  return (
    <motion.div className="giant-loader-animation">
      <div className="giant-loader-overlay"></div>

      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="giant-loader-content"
      >
        {isCloseButtonVisiable && (
          <div
            className="giant-loader-cloose-button"
            onClick={() => setIsOpen(false)}
          >
            <TfiClose size="30px" />
          </div>
        )}
        <h1 class="giant-loader-text">Loading</h1>
        <LoadingGif isPuff color="white " width="100px" height="100px" />
      </motion.div>
    </motion.div>
  );
};

export default GiantLoaderAnimation;
