import { motion } from "framer-motion";
import VerticalDivider from "../VerticalDiverder";
import "./style.scss";
const Title = ({ text, desc, addDivider = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0.5, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="sign-in-to-hepbit">{text}</h1>
      {addDivider && <VerticalDivider />}
      {desc && <p class="title-desc">{desc}</p>}
    </motion.div>
  );
};

export default Title;
